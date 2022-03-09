import { NextFunction, Request, Response, Router } from "express";
import DatabaseError from "../model/erro/DatabaseError";
import { StatusCodes } from "http-status-codes";
import shortId from "shortid";
import { config } from "../config/Constants";
import { URL, URLModel } from "../model/URL";

const urlControllerRouter = Router();

urlControllerRouter.post('/encurtar', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyReq = req.body;
        const urlOriginal = bodyReq.urlOriginal;
        let apelido = "";
        let urlEncurtadaComApelido = "";
        let hash = "";
        let urlEncurtadaComHash = "";
        const url = await URLModel.findOne({ urlOriginal }).exec();
        if (url) {
            res.json(url);
            return;
        }
        let urlEncurtada = { urlOriginal: urlOriginal };
        if (bodyReq.apelido) {
            let apelidoRepetido = await URLModel.findOne({ apelido: bodyReq.apelido }).exec();
            if (apelidoRepetido) {
                throw new DatabaseError("Já existe url encurtada com esse apelido");
            } else {
                apelido = bodyReq.apelido;
                urlEncurtadaComApelido = `${config.API_URL}/${apelido}`;
                urlEncurtada.apelido = apelido;
                urlEncurtada.urlEncurtadaComApelido = urlEncurtadaComApelido;
            }
        } else {
            hash = shortId.generate();
            urlEncurtadaComHash = `${config.API_URL}/${hash}`;
            urlEncurtada.hash = hash;
            urlEncurtada.urlEncurtadaComHash = urlEncurtadaComHash;
            apelido = "";
        }
        const urlNova = await URLModel.create(urlEncurtada) as URL;
        res.status(StatusCodes.CREATED).json(urlNova);
    } catch (error) {
        next(error);
    }
});

urlControllerRouter.get('/:extensao', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {const { extensao } = req.params;
        const urlHash = await URLModel.findOne({ hash: extensao }).exec();
        if (urlHash) {
            res.redirect(urlHash.urlOriginal);
            return;
        }
        const urlApelido = await URLModel.findOne({ apelido: extensao }).exec();
        if (urlApelido) {{
            res.redirect(urlApelido.urlOriginal);
            return
        }}
        res.status(400).json({ error: 'URL não encontrada' });
    } catch (error) {
        next(error);
    }
});

export default urlControllerRouter;
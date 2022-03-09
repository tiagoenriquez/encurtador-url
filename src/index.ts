import express from "express";
import { MongoConnection } from "./database/MongoConnection";
import urlControllerRouter from "./controller/URLController";
import errorHandler from "./middleware/errorHandler";

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

const database = new MongoConnection();
database.connect();

api.use(urlControllerRouter);
api.use(errorHandler);

api.listen(5000, () => {
    console.log(`API rodando na porta 5000`);
});
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../model/erro/DatabaseError";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    if (error instanceof DatabaseError) {
        res.status(StatusCodes.BAD_REQUEST).send(error.message);
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;
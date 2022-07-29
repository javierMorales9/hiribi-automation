import { NextFunction, Request, Response } from "express";
import {CustomError} from "./GeneralError";
import StatusCodes from "http-status-codes";
import "express-async-errors";
import { formatEuropeanDate } from "../functions";
//import { logger } from "../logging/winstonConfig";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const msg: string = err instanceof CustomError ?
        err.getMsg() : "The petition cannot be processed";

    const status: number =
        err instanceof CustomError ? err.getHttpStatus() : StatusCodes.BAD_REQUEST;

    //logger.error("returned error: " + err.message + ". Status code: " + status);

    res.status(status).json({
        status,
        error: msg,
        timestamp: formatEuropeanDate(new Date()),
    });
};
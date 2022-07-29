import { NextFunction, Request, Response } from "express";
import {logger} from "./Logger";

export function logEndpointInfo(req: Request, res: Response, next: NextFunction){

    logger.debug(req.method + " to " + req.baseUrl + req.url + " from " + req.ip);
    next();
}
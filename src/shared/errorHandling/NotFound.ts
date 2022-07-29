import { Request, Response } from "express";
import {logger} from "../logging/Logger";

export const notFound = (req: Request, res: Response) => {
    logger.warn("Resource not found " + req.baseUrl + req.url);

    res.status(404).send({
        err: "Resource not found",
    });
};
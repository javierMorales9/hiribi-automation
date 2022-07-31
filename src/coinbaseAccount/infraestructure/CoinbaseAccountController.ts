import {inject, singleton} from "tsyringe";
import {NextFunction, Request, Response, Router} from "express";
import {CoinbaseAccountRequest} from "../domain/CoinbaseAccountRequest";

@singleton()
export default class CoinbaseAccountController {

    public readonly router: Router;

    constructor(
    ) {
        this.router = Router();
        this.router.post("/", this.create);
        //this.router.post("/", this.createAccount);
    }

    private create = async (req: Request, res: Response) => {
        const rawData = req.body;
        const coinbaseAccountRequest = new CoinbaseAccountRequest(rawData);
    }
}


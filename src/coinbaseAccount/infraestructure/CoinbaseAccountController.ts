import {inject, singleton} from "tsyringe";
import {NextFunction, Request, Response, Router} from "express";
import {CoinbaseAccountRequest} from "../domain/CoinbaseAccountRequest";
import CoinbaseAccountCreateUseCase from "../application/CoinbaseAccountCreateUseCase";

@singleton()
export default class CoinbaseAccountController {

    public readonly router: Router;

    constructor(
        @inject(CoinbaseAccountCreateUseCase)private coinbaseAccountCreator:CoinbaseAccountCreateUseCase
    ) {
        this.router = Router();
        this.router.post("/", this.create);
    }

    private create = async (req: Request, res: Response) => {
        const rawData = req.body;
        const coinbaseAccountRequest = new CoinbaseAccountRequest(rawData);
    }
}


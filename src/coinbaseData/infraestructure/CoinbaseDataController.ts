import {inject, singleton} from "tsyringe";
import {NextFunction, Request, Response, Router} from "express";
import {CoinbaseDataRequest} from "../domain/CoinbaseDataRequest";
import CoinbaseDataCreateUseCase from "../application/CoinbaseDataCreateUseCase";

@singleton()
export default class CoinbaseDataController {

    public readonly router: Router;

    constructor(
        @inject(CoinbaseDataCreateUseCase)private coinbaseAccountCreator:CoinbaseDataCreateUseCase
    ) {
        this.router = Router();
        this.router.post("/", this.create);
    }

    private create = async (req: Request, res: Response) => {
        const rawData = req.body;
        const coinbaseAccountRequest = new CoinbaseDataRequest(rawData);

        const coinbaseData = await this.coinbaseAccountCreator.create(coinbaseAccountRequest);

        res.json(coinbaseData);
    }
}


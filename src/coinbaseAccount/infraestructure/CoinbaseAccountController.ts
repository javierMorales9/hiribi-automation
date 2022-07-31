import {inject, singleton} from "tsyringe";
import {NextFunction, Request, Response, Router} from "express";

@singleton()
export default class CoinbaseAccountController {

    public readonly router: Router;

    constructor(
    ) {
        this.router = Router();
        this.router.get("/", this.getHello);
        //this.router.post("/", this.createAccount);
    }

    private getHello = async (req: Request, res: Response) => {
        res.send("Hello");
    }
}


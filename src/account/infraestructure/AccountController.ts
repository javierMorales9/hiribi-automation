import {Router, Request, Response} from "express";
import {AccountRequest} from "../domain/AccountRequest";
import {logger} from "../../shared/logging/Logger";

class AccountController {

    private router: Router = Router();

    constructor() {
        this.router.get("/", this.getHello);
        this.router.post("/", this.createAccount);
    }

    public getRouter(){
        return this.router;
    }

    private getHello(req: Request, res: Response){
        res.send("Hello this is the account endpoint");
    }

    private createAccount(req: Request, res: Response){
        const accountRequest: AccountRequest = new AccountRequest(req.body);
        res.send(accountRequest);
    }
}

export default (new AccountController()).getRouter();
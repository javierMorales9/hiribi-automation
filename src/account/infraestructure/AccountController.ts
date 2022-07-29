import {Router, Request, Response} from "express";
import {AccountRequest} from "../domain/AccountRequest";
import {logger} from "../../shared/logging/Logger";
import {AccountCreationUseCase} from "../application/AccountCreationUseCase";

class AccountController {

    private router: Router = Router();
    private accountCreationUseCase: AccountCreationUseCase = new AccountCreationUseCase();

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

    private async createAccount(req: Request, res: Response){
        const accountRequest: AccountRequest = new AccountRequest(req.body);

        await this.accountCreationUseCase.create(accountRequest);

        res.send(accountRequest);
    }
}

export default (new AccountController()).getRouter();
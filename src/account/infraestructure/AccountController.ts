import {Router, Request, Response, NextFunction} from "express";
import {AccountRequest} from "../domain/AccountRequest";
import {logger} from "../../shared/logging/Logger";
import {AccountCreationUseCase} from "../application/AccountCreationUseCase";
import {AccountRepository} from "../domain/AccountRepository";
import {InMemoryAccountRepository} from "./InMemoryAccountRepository";

class AccountController {

    private readonly router: Router;
    private readonly accountCreationUseCase: AccountCreationUseCase;

    constructor() {
        const accountRepository: AccountRepository = new InMemoryAccountRepository();
        this.accountCreationUseCase = new AccountCreationUseCase(accountRepository);

        this.router = Router();
        this.router.get("/", this.getHello);
        this.router.post("/", this.createAccount);
    }

    public getRouter(){
        return this.router;
    }

    private getHello(req: Request, res: Response){
        res.send("Hello this is the account endpoint");
    }

    private createAccount = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const accountRequest: AccountRequest = new AccountRequest(req.body);
            await this.accountCreationUseCase.create(accountRequest);

            res.status(201).end();
        }
        catch(err){
            next(err);
        }
    }
}

export default (new AccountController()).getRouter();
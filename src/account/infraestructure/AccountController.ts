import {Router, Request, Response, NextFunction} from "express";
import {AccountRequest} from "../domain/AccountRequest";
import {logger} from "../../shared/logging/Logger";
import {AccountCreationUseCase} from "../application/AccountCreationUseCase";
import {AccountRepository} from "../domain/AccountRepository";
import {InMemoryAccountRepository} from "./InMemoryAccountRepository";
import {AccountGetInfoUseCase} from "../application/AccountGetInfoUseCase";

class AccountController {

    private readonly router: Router;
    private readonly accountCreationUseCase: AccountCreationUseCase;
    private readonly accountGetInfoUseCase: AccountGetInfoUseCase;

    constructor() {
        const accountRepository: AccountRepository = new InMemoryAccountRepository();
        this.accountCreationUseCase = new AccountCreationUseCase(accountRepository);
        this.accountGetInfoUseCase = new AccountGetInfoUseCase(accountRepository);

        this.router = Router();
        this.router.get("/", this.getAccount);
        this.router.post("/", this.createAccount);
    }

    public getRouter(){
        return this.router;
    }

    private getAccount = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const account = await this.accountGetInfoUseCase.get("0");
            res.json(account);
        }
        catch(err){
            next(err);
        }
    }

    private createAccount = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const accountRequest: AccountRequest = new AccountRequest(req.body);
            const savedAccount = await this.accountCreationUseCase.create(accountRequest);

            res.json(savedAccount);
        }
        catch(err){
            next(err);
        }
    }
}

export default (new AccountController()).getRouter();
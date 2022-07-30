import {Router, Request, Response, NextFunction} from "express";
import {AccountRequest} from "../domain/AccountRequest";
import {logger} from "../../shared/logging/Logger";
import {AccountCreationUseCase} from "../application/AccountCreationUseCase";
import {AccountRepository} from "../domain/AccountRepository";
import {AccountGetInfoUseCase} from "../application/AccountGetInfoUseCase";
import {issueJWT, validApiKey} from "../../shared/security/securityUtils";
import {LoginData} from "../domain/LoginData";
import passport from "passport";
import {inMemoryAccountRepository} from "../../Dependencies";

class AccountController {

    private readonly router: Router;
    private readonly accountCreationUseCase: AccountCreationUseCase;
    private readonly accountGetInfoUseCase: AccountGetInfoUseCase;

    constructor() {
        const accountRepository: AccountRepository = inMemoryAccountRepository;
        this.accountCreationUseCase = new AccountCreationUseCase(accountRepository);
        this.accountGetInfoUseCase = new AccountGetInfoUseCase(accountRepository);

        this.router = Router();
        this.router.get(
            "/",
            passport.authenticate("jwt", { session: false }),
            this.getAccount
        );
        this.router.post("/", this.createAccount);
        this.router.post("/login", this.logIn);
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

            const tokenData = issueJWT(savedAccount);

            res.json({
                account: savedAccount,
                token: tokenData.token,
                expiresIn: tokenData.expires
            });
        }
        catch(err){
            next(err);
        }
    }

    private logIn = async(req: Request, res: Response, next: NextFunction) => {
        const rawLoginData = req.body;
        try{
            const loginData = new LoginData(rawLoginData);

            const account = await this.accountGetInfoUseCase.getAccountByName(loginData.user);
            validApiKey(loginData.password, account.encryptedPassword);

            const tokenData = issueJWT(account)

            res.json({
                account: account,
                token: tokenData.token,
                expiresIn: tokenData.expires
            });
        }
        catch(err){
            next(err);
        }
    }
}

export default (new AccountController()).getRouter();
import "reflect-metadata";
import {Router, Request, Response, NextFunction} from "express";
import {AccountRequest} from "../domain/AccountRequest";
import {AccountCreationUseCase} from "../application/AccountCreationUseCase";
import {AccountGetInfoUseCase} from "../application/AccountGetInfoUseCase";
import {issueJWT, validApiKey} from "../../shared/security/securityUtils";
import {LoginData} from "../domain/LoginData";
import passport from "passport";
import {inject, singleton} from "tsyringe";

@singleton()
export default class AccountController {

    public readonly router: Router;

    constructor(
        @inject(AccountCreationUseCase)private accountCreationUseCase: AccountCreationUseCase,
        @inject(AccountGetInfoUseCase)private accountGetInfoUseCase: AccountGetInfoUseCase
    ) {

        this.router = Router();
        this.router.get(
            "/",
            passport.authenticate("jwt", { session: false }),
            this.getAccount
        );
        this.router.post("/", this.createAccount);
        this.router.post("/login", this.logIn);
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
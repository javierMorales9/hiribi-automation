import {Router} from "express";

import passport from "passport";
import {logEndpointInfo} from "./shared/logging/logEndpointInfo";
import AccountController from "./account/infraestructure/AccountController";
import {inject, singleton} from "tsyringe";
import CoinbaseAccountController from "./coinbaseAccount/infraestructure/CoinbaseAccountController";

@singleton()
export default class BaseController{
    public readonly router;

    constructor(
        @inject(AccountController)accountController: AccountController,
        @inject(CoinbaseAccountController)coinbaseAccountController: CoinbaseAccountController
    ){
        this.router = Router();

        this.router.use(
            "/account",
            logEndpointInfo,
            accountController.router
        );

        this.router.use(
            "/coinbaseAccount",
            logEndpointInfo,
            passport.authenticate("jwt", { session: false }),
            coinbaseAccountController.router
        );
    }
}
import {Router} from "express";

import passport from "passport";
import {logEndpointInfo} from "./shared/logging/logEndpointInfo";
import AccountController from "./account/infraestructure/AccountController";
import {inject, singleton} from "tsyringe";
import CoinbaseDataController from "./coinbaseData/infraestructure/CoinbaseDataController";

@singleton()
export default class BaseController{
    public readonly router;

    constructor(
        @inject(AccountController)accountController: AccountController,
        @inject(CoinbaseDataController)coinbaseAccountController: CoinbaseDataController
    ){
        this.router = Router();

        this.router.use(
            "/account",
            logEndpointInfo,
            accountController.router
        );

        this.router.use(
            "/coinbaseData",
            logEndpointInfo,
            passport.authenticate("jwt", { session: false }),
            coinbaseAccountController.router
        );
    }
}
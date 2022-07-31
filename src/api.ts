import {Router} from "express";

import passport from "passport";
import {logEndpointInfo} from "./shared/logging/logEndpointInfo";
import AccountController from "./account/infraestructure/AccountController";
import {inject, singleton} from "tsyringe";

@singleton()
export default class BaseController{
    public readonly router;

    constructor(
        @inject(AccountController)accountController: AccountController
    ){
        this.router = Router();

        this.router.use(
            "/account",
            logEndpointInfo,
            accountController.router
        );
    }
}

//passport.authenticate("jwt", { session: false })
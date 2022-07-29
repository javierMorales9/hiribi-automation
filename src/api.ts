//import "./shared/setEnv";
import { Router, Request, Response} from "express";
import accountController from "./account/infraestructure/AccountController";

//import flowRouter from "./flow/infrastructure/rest/flowRouter";
//import accountRouter from "./account/infrastructure/rest/accountRouter";
import passport from "passport";
import {logEndpointInfo} from "./shared/logging/logEndpointInfo";

const baseRouter = Router();

baseRouter.use(
    "/account",
    logEndpointInfo,
    accountController
);

//baseRouter.use(
//    "/flow",
//    logEndpointInfo,
//    passport.authenticate("jwt", { session: false }),
//    flowRouter
//);

export default baseRouter;
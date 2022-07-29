//import "./shared/setEnv";
import { Router, Request, Response} from "express";

//import flowRouter from "./flow/infrastructure/rest/flowRouter";
//import accountRouter from "./account/infrastructure/rest/accountRouter";
import passport from "passport";
//import { logEndpointInfo } from "./shared/logEndopoints";

const baseRouter = Router();

baseRouter.use("/", (req: Request, res: Response) => {
    res.send("Hola amigos");
});

// Setup routers
//baseRouter.use(
//    "/account",
//    logEndpointInfo,
//    accountRouter
//);

//baseRouter.use(
//    "/flow",
//    logEndpointInfo,
//    passport.authenticate("jwt", { session: false }),
//    flowRouter
//);

export default baseRouter;
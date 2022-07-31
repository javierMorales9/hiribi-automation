import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import passport from "passport";

import { errorHandler } from "./shared/errorHandling/ErrorHandler";
import { notFound } from "./shared/errorHandling/NotFound";
import {inject, singleton} from "tsyringe";
import {PassportConfigurator} from "./shared/security/configurePassport";
import BaseController from "./api";
import {logger} from "./shared/logging/Logger";
import {SequelizeWrapper} from "./shared/sequelize/SequelizeWrapper";

@singleton()
export default class Server {
    private serverStartMsg = "Express server started on port: ";
    private port = process.env.PORT || 3000;
    private app = express();

    constructor(
        @inject(PassportConfigurator)private passportConfigurator: PassportConfigurator,
        @inject(BaseController)private baseController: BaseController,
        @inject(SequelizeWrapper)private sequelizeWrapper: SequelizeWrapper
    ) {}

    public async start(){
        await this.initializeDbConnection();
        this.setUpMiddlewares();
        this.configurePassport();
        this.setUpRoutes();
        this.setApiRoutes();

        this.listen();
    }

    private listen(){
       this.app.listen(
           this.port,
           () => logger.info(this.serverStartMsg + this.port)
       )
    }

    private setUpMiddlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private configurePassport(){
        this.passportConfigurator.configurePassport(passport);
        this.app.use(passport.initialize());
    }

    private setUpRoutes(){
        if (process.env.NODE_ENV === "development") {
            this.app.use(morgan("dev"));
        }

        if (process.env.NODE_ENV === "production") {
            this.app.use(helmet());
        }
    }

    private setApiRoutes(){
        this.app.use("/", this.baseController.router);

        this.app.use(errorHandler);
        this.app.use(notFound);
    }

    private async initializeDbConnection(){
        await this.sequelizeWrapper.start();
    }
}
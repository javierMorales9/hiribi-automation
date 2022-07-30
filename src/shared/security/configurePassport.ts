import "reflect-metadata"
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { PassportStatic } from "passport";
import { transformKey } from "./transformKey";
import {CustomError} from "../errorHandling/GeneralError";
import {AccountGetInfoUseCase} from "../../account/application/AccountGetInfoUseCase";
import {inject, singleton} from "tsyringe";

@singleton()
export class PassportConfigurator{

    constructor(@inject(AccountGetInfoUseCase)private accountGetInfoUseCase: AccountGetInfoUseCase) {}

    private PUB_KEY = transformKey(process.env.PUB_KEY);
    private options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.PUB_KEY,
        algorithms: ["RS256"],
    };
    private strategy = new Strategy(this.options, (payload, done) => {
        this.accountGetInfoUseCase
            .get(payload.sub as string)
            .then((account) => {
                if (!account) return done(null, false);

                return done(null, account);
            })
            .catch(() => done(new CustomError("Access not allowed", 403), null));
    });

    public configurePassport = (passport: PassportStatic): void => {
        passport.use(this.strategy);
    }
}
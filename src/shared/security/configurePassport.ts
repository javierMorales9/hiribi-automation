import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { PassportStatic } from "passport";
import { transformKey } from "./transformKey";
import {CustomError} from "../errorHandling/GeneralError";
import {AccountGetInfoUseCase} from "../../account/application/AccountGetInfoUseCase";
import {inMemoryAccountRepository} from "../../Dependencies";

const PUB_KEY = transformKey(process.env.PUB_KEY);
//TODO: Fix this instantiation
const accountGetInfoUseCase = new AccountGetInfoUseCase(inMemoryAccountRepository);

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};

const strategy = new Strategy(options, (payload, done) => {
    accountGetInfoUseCase
        .get(payload.sub as string)
        .then((account) => {
            if (!account) return done(null, false);

            return done(null, account);
        })
        .catch(() => done(new CustomError("Access not allowed", 403), null));
});

export default function configurePassport(passport: PassportStatic): void {
    passport.use(strategy);
}
import {Account} from "../../account/domain/Account";
import jsonwebtoken from "jsonwebtoken";
import {transformKey} from "./transformKey";
import bcrypt from "bcrypt";
import {IncorrectPasswordError} from "./IncorrectPasswordError";

export function issueJWT(account: Account) {
    //here we should use the privateKey instead.
    const id = account.id;
    const PRIV_KEY = transformKey(process.env.PRIV_KEY);

    if (!id) throw new Error("The account has no id");

    const expiresIn = "1d";

    const payload = {
        sub: id,
        iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: expiresIn,
        algorithm: "RS256",
    });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn,
    };
}

export function validApiKey(receivedPassword: string, encryptedPassword: string) {
    const isCorrect = bcrypt.compareSync(receivedPassword, encryptedPassword);

    if(!isCorrect)
        throw new IncorrectPasswordError();
}
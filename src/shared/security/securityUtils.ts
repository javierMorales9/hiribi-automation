import {Account} from "../../account/domain/Account";
import jsonwebtoken from "jsonwebtoken";
import {transformKey} from "./transformKey";

export function issueJWT(account: Account) {
    //here we should use the privateKey instead.
    const id = account.id;
    const PRIV_KEY = transformKey(process.env.PRIV_KEY);

    if (!id) throw new Error("the account has no id");

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

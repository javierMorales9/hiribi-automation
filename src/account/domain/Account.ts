import {AccountRequest} from "./AccountRequest";
import bcrypt from "bcrypt";

export class Account{
    readonly name: string;
    readonly email: string;
    readonly encryptedPassword: string;

    constructor(name?: string, email?: string, encryptedPassword?: string) {
        this.name = name || "";
        this.email = email || "";
        this.encryptedPassword = encryptedPassword || "";
    }

    public static async fromAccountRequest(accountRequest: AccountRequest){
        const name = accountRequest.name;
        const email = accountRequest.email;
        const encryptedPassword =
            await this.encryptPassword(accountRequest.password)

        return new Account(name, email, encryptedPassword);
    }

    private static async encryptPassword(password: string) {
        const BCRYPT_SALT_ROUNDS = 12;
        return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    }
}
import "reflect-metadata";
import {AccountRequest} from "./AccountRequest";
import bcrypt from "bcrypt";
import {container} from "tsyringe";
import {AccountRepository} from "./AccountRepository";
import AccountNameAlreadyExistError from "./errors/AccountNameAlredyExistError";

export class Account{

    constructor(
        readonly name: string,
        readonly email: string,
        readonly encryptedPassword: string,
        readonly id?:string) {}

    public static async fromAccountRequest(accountRequest: AccountRequest){
        const name = accountRequest.name;
        const email = accountRequest.email;
        const encryptedPassword =
            await this.encryptPassword(accountRequest.password)

        await this.stopIfNameAlreadyExist(name)

        return new Account(name, email, encryptedPassword);
    }

    private static async encryptPassword(password: string) {
        const BCRYPT_SALT_ROUNDS = 12;
        return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    }

    private static async stopIfNameAlreadyExist(name: string) {
        const accountRepository = container.resolve<AccountRepository>("AccountRepository");

        const accountWithTheName = await accountRepository.getByAccountName(name);

        if(accountWithTheName)
            throw new AccountNameAlreadyExistError();
    }

}
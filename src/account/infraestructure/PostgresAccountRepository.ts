import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import AccountModel from "./AccountModel";

//Delete this
const sampleAccount: Account = {
    id: "0",
    name: "Jogo",
    email: "Cago",
    encryptedPassword: "Qudi",
}

export default class PostgresAccountRepository implements AccountRepository{

    public async create(account: Account): Promise<Account> {
        const accountToCreate = AccountModel.build({
            name: account.name,
            email: account.email,
            encryptedPassword: account.encryptedPassword
        });

        const savedAccount = await accountToCreate.save();
        console.log(savedAccount);

        return Promise.resolve(sampleAccount);
    }

    public async get(id: string): Promise<Account | null> {
        return Promise.resolve(sampleAccount);
    }

    public async getByAccountName(name: string): Promise<Account | null> {
        return Promise.resolve(sampleAccount);
    }
}
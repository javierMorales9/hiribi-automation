import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import AccountModel from "./AccountModel";

export default class PostgresAccountRepository implements AccountRepository{

    public async create(account: Account): Promise<Account> {
        const accountModel = await AccountModel.create({
            name: account.name,
            email: account.email,
            encryptedPassword: account.encryptedPassword
        });

        return this.transformToAccount(accountModel);
    }

    public async get(id: string): Promise<Account | null> {
        const accountModel = await AccountModel.findByPk(parseInt(id));
        return this.handleFinding(accountModel);
    }

    public async getByAccountName(name: string): Promise<Account | null> {
        const accountModel = await AccountModel.findOne({
            where: {name}
        });
        return this.handleFinding(accountModel);
    }

    private transformToAccount(accountModel: AccountModel): Account{
        return new Account(
            accountModel.name,
            accountModel.email,
            accountModel.encryptedPassword,
            accountModel.id.toString()
        );
    }

    private handleFinding(accountModel: AccountModel | null): Account | null{
       if(!accountModel)
           return null

        return this.transformToAccount(accountModel);
    }

}
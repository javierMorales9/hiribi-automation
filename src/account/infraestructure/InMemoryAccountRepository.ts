import "reflect-metadata";
import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import {Lifecycle, registry, singleton} from "tsyringe";

@singleton()
@registry([{token: 'AccountRepository', useClass: InMemoryAccountRepository, options:{lifecycle: Lifecycle.Singleton}}])
export class InMemoryAccountRepository implements AccountRepository{
   private readonly accounts: Account[];

    constructor() {
        this.accounts = [];
    }
    create(account: Account): Promise<Account> {
        this.accounts[0] = new Account(
            account.name,
            account.email,
            account.encryptedPassword,
            "0"
        );
        return Promise.resolve(this.accounts[0]);
    }

    get(id: string): Promise<Account | null> {
        const numberId = parseInt(id);

        if(numberId !== 0 || !this.accounts[0])
            return Promise.resolve(null);

        return Promise.resolve(this.accounts[numberId]);
    }

    getByAccountName(name: string): Promise<Account | null> {
        if(name !== this.accounts[0].name)
            return Promise.resolve(null);

        return Promise.resolve(this.accounts[0]);
    }
}
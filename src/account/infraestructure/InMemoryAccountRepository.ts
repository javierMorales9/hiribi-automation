import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import {AccountNotFoundError} from "../domain/AccountNotFoundError";

export class InMemoryAccountRepository implements AccountRepository{
   private readonly accounts: Account[];

    constructor() {
        this.accounts = [];
    }

    create(account: Account): Promise<void> {
        this.accounts.push(account);
        return Promise.resolve();
    }

    get(id: string): Promise<Account> {
        const numberId = parseInt(id);

        if(numberId !== 0 || !this.accounts[0])
            throw new AccountNotFoundError(numberId);

        return Promise.resolve(this.accounts[numberId]);
    }
}
import "reflect-metadata";
import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import {AccountNotFoundError} from "../domain/AccountNotFoundError";
import {inject, singleton} from "tsyringe";

@singleton()
export class AccountGetInfoUseCase {

    constructor(@inject("AccountRepository") private accountRepository: AccountRepository) {}

    public async get(id: string): Promise<Account> {
        const account = await this.accountRepository.get(id);

        if(!account)
            throw new AccountNotFoundError("id", id);

        return account;
    }

    public async getAccountByName(name: string): Promise<Account> {
        const account = await this.accountRepository.getByAccountName(name);

        if(!account)
            throw new AccountNotFoundError("name", name);

        return account;
    }
}
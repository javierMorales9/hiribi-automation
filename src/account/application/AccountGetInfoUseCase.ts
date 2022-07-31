import "reflect-metadata";
import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import {inject, singleton} from "tsyringe";
import RecordNotFoundException from "../../shared/errorHandling/RecordNotFoundException";

@singleton()
export class AccountGetInfoUseCase {

    constructor(@inject("AccountRepository") private accountRepository: AccountRepository) {}

    public async get(id: string): Promise<Account> {
        const account = await this.accountRepository.get(id);

        if(!account)
            throw new RecordNotFoundException("Account", "id", id);

        return account;
    }

    public async getAccountByName(name: string): Promise<Account> {
        const account = await this.accountRepository.getByAccountName(name);

        if(!account)
            throw new RecordNotFoundException("Account", "id", name);

        return account;
    }
}
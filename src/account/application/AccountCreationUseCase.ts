import "reflect-metadata";
import {AccountRequest} from "../domain/AccountRequest";
import {Account} from "../domain/Account";
import {AccountRepository} from "../domain/AccountRepository";
import {inject, singleton} from "tsyringe";

@singleton()
export class AccountCreationUseCase{

    constructor(@inject("AccountRepository") private accountRepository: AccountRepository) {}

    public async create(accountRequest: AccountRequest): Promise<Account> {

        const account = await Account.fromAccountRequest(accountRequest);
        const createdAccount = await this.accountRepository.create(account);

        return createdAccount;
    }
}
import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import {logger} from "../../shared/logging/Logger";
import {AccountNotFoundError} from "../domain/AccountNotFoundError";

export class AccountGetInfoUseCase {

    private accountRepository:AccountRepository;

    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository;
    }

    public async get(id: string): Promise<Account> {
        const account = await this.accountRepository.get(id);

        if(!account)
            throw new AccountNotFoundError("id", id);

        return account;
    }
}
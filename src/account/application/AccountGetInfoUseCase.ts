import {AccountRepository} from "../domain/AccountRepository";
import {Account} from "../domain/Account";
import {logger} from "../../shared/logging/Logger";

export class AccountGetInfoUseCase {

    private accountRepository:AccountRepository;

    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository;
    }

    public async get(id: string): Promise<Account> {
        const account = await this.accountRepository.get(id);
        return account;
    }
}
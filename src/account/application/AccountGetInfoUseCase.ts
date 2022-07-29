import {AccountRepository} from "../domain/AccountRepository";

export class AccountGetInfoUseCase {

    private accountRepository:AccountRepository;

    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository;
    }

    public async get() {
    }
}
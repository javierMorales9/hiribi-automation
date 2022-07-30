import {AccountRequest} from "../domain/AccountRequest";
import {Account} from "../domain/Account";
import {AccountRepository} from "../domain/AccountRepository";

export class AccountCreationUseCase{

    private accountRepository: AccountRepository;

    constructor(accountRepository: AccountRepository) {
       this.accountRepository =  accountRepository;
    }

    public async create(accountRequest: AccountRequest): Promise<Account> {

        const account = await Account.fromAccountRequest(accountRequest);
        const createdAccount = await this.accountRepository.create(account);

        return createdAccount;
    }
}
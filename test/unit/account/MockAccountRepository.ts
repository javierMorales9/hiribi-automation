import {AccountRepository} from "../../../src/account/domain/AccountRepository";
import {Account} from "../../../src/account/domain/Account";

export const mockAccount = new Account(
    "Juanito",
    "juanito@gmail.com",
    "mefisto"
    );

export class MockAccountRepository implements AccountRepository{

    private account: Account | null = null;

    get(id: string): Promise<Account> {
        if(this.account)
            return Promise.resolve(this.account);

        return Promise.resolve(mockAccount);
    }

    create(account: Account): Promise<Account>{
        this.account = new Account(
            account.name,
            account.email,
            account.encryptedPassword,
            "0"
        );
        return Promise.resolve(this.account);
    }
}
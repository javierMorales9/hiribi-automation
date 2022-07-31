import {AccountRepository} from "../../../src/account/domain/AccountRepository";
import {Account} from "../../../src/account/domain/Account";

export const mockAccount = new Account(
    "Juanito",
    "juanito@gmail.com",
    "mefisto",
    "0"
    );

export class MockAccountRepository implements AccountRepository{

    get(id: string): Promise<Account | null> {
        if(id != mockAccount.id)
            return Promise.resolve(null);

        return Promise.resolve(mockAccount);
    }

    create(account: Account): Promise<Account>{
        const accountCreated = new Account(
            account.name,
            account.email,
            account.encryptedPassword,
            "0"
        );
        return Promise.resolve(accountCreated);
    }

    getByAccountName(name: string): Promise<Account | null> {
        if(name !== mockAccount.name)
            return Promise.resolve(null);

        return Promise.resolve(mockAccount);
    }
}
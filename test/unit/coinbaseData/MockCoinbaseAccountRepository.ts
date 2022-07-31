import {AccountRepository} from "../../../src/account/domain/AccountRepository";
import {Account} from "../../../src/account/domain/Account";

export const mockAccount = new Account(
    "Juanito",
    "juanito@gmail.com",
    "mefisto",
    "0"
);

export class MockCoinbaseAccountRepository {

    create(account: Account): Promise<Account>{
        const accountCreated = new Account(
            account.name,
            account.email,
            account.encryptedPassword,
            "0"
        );
        return Promise.resolve(accountCreated);
    }
}

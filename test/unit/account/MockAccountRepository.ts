import {AccountRepository} from "../../../src/account/domain/AccountRepository";
import {Account} from "../../../src/account/domain/Account";

export const mockAccount = new Account(
    "Juanito",
    "juanito@gmail.com",
    "mefisto"
    );

export class MockAccountRepository implements AccountRepository{

    get(id: string): Promise<Account> {
        return Promise.resolve(mockAccount);
    }
}
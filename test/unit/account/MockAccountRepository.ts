import {AccountRepository} from "../../../src/account/domain/AccountRepository";
import {Account} from "../../../src/account/domain/Account";

export class MockAccountRepository implements AccountRepository{

    get(id: string): Promise<Account> {
        return Promise.resolve(new Account());
    }
}
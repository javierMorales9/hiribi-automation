import {Account} from "./Account";

export interface AccountRepository{
    get: (id: string) => Promise<Account | null>;
    //getByAccountName: (name: string) => Promise<Account>;
    create: (account: Account) => Promise<Account>;
}
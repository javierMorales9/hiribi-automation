import {Account} from "./Account";

export interface AccountRepository{
    get: (id: string) => Promise<Account | null>;
    getByAccountName: (name: string) => Promise<Account | null>;
    create: (account: Account) => Promise<Account>;
}
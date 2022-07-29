import {Account} from "./Account";

export interface AccountRepository{
    get: (id: string) => Promise<Account>;
}
import {Account} from "./Account";

export default class AccountResponse {
    readonly id?: string;
    readonly name: string;
    readonly email: string;

    constructor(account: Account){
        this.id = account.id;
        this.name = account.name;
        this.email = account.email;
    }
}
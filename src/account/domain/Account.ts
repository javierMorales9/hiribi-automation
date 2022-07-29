import {AccountRequest} from "./AccountRequest";

export class Account{
    readonly name: string;
    readonly email: string;
    readonly encryptedPassword: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.encryptedPassword = password;
    }

    public static fromAccountRequest(accountRequest: AccountRequest){
        return new Account(
            accountRequest.name,
            accountRequest.email,
            accountRequest.password
        );
    }

}
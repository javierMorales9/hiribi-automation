
export class Account{
    readonly name: string;
    readonly email: string;
    readonly encryptedPassword: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.encryptedPassword = password;
    }
}
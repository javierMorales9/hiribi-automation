import {IncorrectLoginDataError} from "./errors/IncorrectLoginDataError";

export class LoginData{
    readonly user: string;
    readonly password: string;

    constructor(rawLoginData: any) {
        if(!rawLoginData.user || !rawLoginData.password)
            throw new IncorrectLoginDataError();

        this.user = rawLoginData.user;
        this.password = rawLoginData.password;
    }
}
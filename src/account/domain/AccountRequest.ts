import {BadAccountInformationError} from "./BadAccountInformationError";

export class AccountRequest{
    readonly name: string;
    readonly email: string;
    readonly password: string

    constructor(element: any){
        if(!element.name || !element.email || !element.password)
            throw new BadAccountInformationError();

        this.name = element.name;
        this.email = element.email;
        this.password = element.password;
    }
}
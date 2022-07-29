import {BadAccountInformationError} from "./BadAccountInformationError";

export class AccountRequest{
    readonly name: string;
    readonly email: string;

    constructor(element: any){
        if(!element.name || !element.email)
            throw new BadAccountInformationError();

        this.name = element.name;
        this.email = element.email;
    }
}
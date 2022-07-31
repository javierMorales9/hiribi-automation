import {BadAccountInformationError} from "../../account/domain/errors/BadAccountInformationError";

export class CoinbaseAccountRequest{
    readonly apiKey: string;
    readonly apiSecret: string;
    readonly apiPassPhrase: string;
    readonly portfolioId: string;

    constructor(element: any){
        if(!element.apiKey || !element.apiSecret || !element.apiPassPhrase || !element.portfolioId)
            throw new BadAccountInformationError();

        this.apiKey = element.apiKey;
        this.apiSecret = element.apiSecret;
        this.apiPassPhrase = element.apiPassPhrase;
        this.portfolioId = element.portfolioId;
    }
}

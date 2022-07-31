import {BadAccountInformationError} from "../../account/domain/errors/BadAccountInformationError";

export class CoinbaseDataRequest {
    readonly apiKey: string;
    readonly apiSecret: string;
    readonly apiPassPhrase: string;
    readonly portfolioId: string;
    readonly accountId: string;

    constructor(element: any){
        if(!element.apiKey || !element.apiSecret || !element.apiPassPhrase || !element.portfolioId || !element.accountId)
            throw new BadAccountInformationError();

        this.apiKey = element.apiKey;
        this.apiSecret = element.apiSecret;
        this.apiPassPhrase = element.apiPassPhrase;
        this.portfolioId = element.portfolioId;
        this.accountId = element.accountId;
    }
}

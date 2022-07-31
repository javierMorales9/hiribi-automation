import {CoinbaseDataRequest} from "./CoinbaseDataRequest";

export default class CoinbaseData {

    constructor(
        readonly apiKey: string,
        readonly apiSecret: string,
        readonly apiPassPhrase: string,
        readonly portfolioId: string,
    ) {}

    public static fromRequest(request: CoinbaseDataRequest){
        return new CoinbaseData(
            request.apiKey,
            request.apiSecret,
            request.apiPassPhrase,
            request.portfolioId
        );
    }

}

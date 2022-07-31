import CoinbaseData from "./CoinbaseData";

export default class CoinbaseDataResponse{
    constructor(
        readonly id: string,
        readonly apiKey: string,
        readonly apiSecret: string,
        readonly apiPassPhrase: string,
        readonly portfolioId: string,
        readonly accountId: string,
    ) {}

    public static fromCoinbaseData(data: CoinbaseData){
        if(!data.id)
            throw new Error("The account has no id");

        return new CoinbaseDataResponse(
            data.id,
            data.apiKey,
            data.apiSecret,
            data.apiPassPhrase,
            data.portfolioId,
            data.accountId
        );
    }
}
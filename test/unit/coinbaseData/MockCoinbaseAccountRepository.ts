import CoinbaseDataRepository from "../../../src/coinbaseData/domain/CoinbaseDataRepository";
import CoinbaseData from "../../../src/coinbaseData/domain/CoinbaseData";
import {CoinbaseDataRequest} from "../../../src/coinbaseData/domain/CoinbaseDataRequest";

const mockCoinbaseData = new CoinbaseData(
    "apiKey",
    "apiSecret",
    "apiPassPhrase",
    "portfolioId",
);

export const coinbaseDataRequest = new CoinbaseDataRequest({
    apiKey: "apiKey",
    apiSecret: "apiSecret",
    apiPassPhrase: "apiPassPhrase",
    portfolioId: "portfolioId",
});

export class MockCoinbaseAccountRepository implements CoinbaseDataRepository{

    create(coinbaseData: CoinbaseData): Promise<CoinbaseData>{
        const createdCoinbaseData = new CoinbaseData(
            coinbaseData.apiKey,
            coinbaseData.apiSecret,
            coinbaseData.apiPassPhrase,
            coinbaseData.portfolioId,
            "0"
        );

        return Promise.resolve(createdCoinbaseData);
    }
}

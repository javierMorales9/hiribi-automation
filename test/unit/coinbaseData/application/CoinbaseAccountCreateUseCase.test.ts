import "reflect-metadata"
import CoinbaseDataCreateUseCase from "../../../../src/coinbaseData/application/CoinbaseDataCreateUseCase";
import {container} from "tsyringe";
import CoinbaseDataRepository from "../../../../src/coinbaseData/domain/CoinbaseDataRepository";
import {MockCoinbaseAccountRepository, coinbaseDataRequest} from "../MockCoinbaseAccountRepository";

container.register<CoinbaseDataRepository>("CoinbaseDataRepository", MockCoinbaseAccountRepository);
const coinbaseAccountCreator = container.resolve(CoinbaseDataCreateUseCase);

describe("Coinbase Account creator", function(){
    it("should create a new Coinbase Account", async function(){
        const savedCoinbaseData
            = await coinbaseAccountCreator.create(coinbaseDataRequest);

        expect(savedCoinbaseData.apiKey).toEqual(coinbaseDataRequest.apiKey);
        expect(savedCoinbaseData.id).toBeDefined();
    });
});
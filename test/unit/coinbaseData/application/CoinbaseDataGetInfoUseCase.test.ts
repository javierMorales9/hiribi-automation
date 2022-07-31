import "reflect-metadata";
import {container} from "tsyringe";
import CoinbaseDataRepository from "../../../../src/coinbaseData/domain/CoinbaseDataRepository";
import {MockCoinbaseAccountRepository, mockCoinbaseData} from "../MockCoinbaseAccountRepository";
import CoinbaseDataGetInfoUseCase from "../../../../src/coinbaseData/application/CoinbaseDataGetInfoUseCase";
import CoinbaseData from "../../../../src/coinbaseData/domain/CoinbaseData";

container.register<CoinbaseDataRepository>("CoinbaseDataRepository", MockCoinbaseAccountRepository);
const coinbaseDataGetter = container.resolve(CoinbaseDataGetInfoUseCase);

describe("coinbase data get info use case", function(){
    it('should get the coinbase data element givent the id', async function () {

        const data: CoinbaseData = await coinbaseDataGetter.get("0");

        expect(data.id).toBeDefined();
        expect(data.apiSecret).toBe(mockCoinbaseData.apiSecret);
    });
});
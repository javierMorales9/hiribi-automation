import "reflect-metadata"
import CoinbaseDataCreateUseCase from "../../../../src/coinbaseData/application/CoinbaseDataCreateUseCase";
import {container} from "tsyringe";
import {CoinbaseDataRequest} from "../../../../src/coinbaseData/domain/CoinbaseDataRequest";

const coinbaseAccountCreator = container.resolve(CoinbaseDataCreateUseCase);

describe("Coinbase Account creator", function(){
    it("should create a new Coinbase Account", async function(){
        const request = new CoinbaseDataRequest({
            apiKey: "apiKey",
            apiSecret: "apiSecret",
            apiPassPhrase: "apiPassPhrase",
            portfolioId: "portfolioId",
        });

        const savedAccount = await coinbaseAccountCreator.create(request);

        expect(savedAccount).toEqual(request);
    });

});
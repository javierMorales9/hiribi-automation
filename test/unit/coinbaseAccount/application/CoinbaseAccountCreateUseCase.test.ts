import "reflect-metadata"
import CoinbaseAccountCreateUseCase from "../../../../src/coinbaseAccount/application/CoinbaseAccountCreateUseCase";
import {container} from "tsyringe";
import {CoinbaseAccountRequest} from "../../../../src/coinbaseAccount/domain/CoinbaseAccountRequest";
import {AccountRequest} from "../../../../src/account/domain/AccountRequest";

const coinbaseAccountCreator = container.resolve(CoinbaseAccountCreateUseCase);

describe("Coinbase Account creator", function(){
    it("should create a new Coinbase Account", async function(){
        const request = new CoinbaseAccountRequest({
            apiKey: "apiKey",
            apiSecret: "apiSecret",
            apiPassPhrase: "apiPassPhrase",
            portfolioId: "portfolioId",
        });

        const savedAccount = await coinbaseAccountCreator.create(request);

        expect(savedAccount).toEqual(request);
    });

});
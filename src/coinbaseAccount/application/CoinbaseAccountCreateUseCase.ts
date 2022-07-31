import "reflect-metadata";
import {singleton} from "tsyringe";
import {CoinbaseAccountRequest} from "../domain/CoinbaseAccountRequest";

@singleton()
export default class CoinbaseAccountCreateUseCase{

    async create(request: CoinbaseAccountRequest):  Promise<CoinbaseAccountRequest>{
        return request;
    }
}
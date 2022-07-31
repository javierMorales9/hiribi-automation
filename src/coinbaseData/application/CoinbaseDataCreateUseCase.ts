import "reflect-metadata";
import {singleton} from "tsyringe";
import {CoinbaseDataRequest} from "../domain/CoinbaseDataRequest";

@singleton()
export default class CoinbaseDataCreateUseCase {

    async create(request: CoinbaseDataRequest):  Promise<CoinbaseDataRequest>{
        return request;
    }
}
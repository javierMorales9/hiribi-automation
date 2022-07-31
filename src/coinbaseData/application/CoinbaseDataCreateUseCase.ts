import "reflect-metadata";
import {singleton} from "tsyringe";
import {CoinbaseDataRequest} from "../domain/CoinbaseDataRequest";
import CoinbaseData from "../domain/CoinbaseData";

@singleton()
export default class CoinbaseDataCreateUseCase {

    async create(request: CoinbaseDataRequest):  Promise<CoinbaseData>{
        const coinbaseData = CoinbaseData.fromRequest(request);
        return coinbaseData;
    }
}
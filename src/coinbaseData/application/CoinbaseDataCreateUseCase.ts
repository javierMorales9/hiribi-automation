import "reflect-metadata";
import {inject, singleton} from "tsyringe";
import {CoinbaseDataRequest} from "../domain/CoinbaseDataRequest";
import CoinbaseData from "../domain/CoinbaseData";
import CoinbaseDataRepository from "../domain/CoinbaseDataRepository";

@singleton()
export default class CoinbaseDataCreateUseCase {

    constructor(
        @inject("CoinbaseDataRepository")private coinbaseDataRepository: CoinbaseDataRepository
    ) {}

    async create(request: CoinbaseDataRequest):  Promise<CoinbaseData>{
        const coinbaseData = CoinbaseData.fromRequest(request);
        return await this.coinbaseDataRepository.create(coinbaseData);
    }
}
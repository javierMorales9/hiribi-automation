import "reflect-metadata";
import {inject, singleton} from "tsyringe";
import CoinbaseDataRepository from "../domain/CoinbaseDataRepository";
import CoinbaseData from "../domain/CoinbaseData";
import RecordNotFoundException from "../../shared/errorHandling/RecordNotFoundException";

@singleton()
export default class CoinbaseDataGetInfoUseCase{

    constructor(
        @inject("CoinbaseDataRepository")private coinbaseDataRepository: CoinbaseDataRepository
    ) {}

    async get(id: string): Promise<CoinbaseData> {
        const coinbaseData = await this.coinbaseDataRepository.get(id);
        if(!coinbaseData)
            throw new RecordNotFoundException("CoinbaseAccount", "id", id);

        return coinbaseData;
    }
}
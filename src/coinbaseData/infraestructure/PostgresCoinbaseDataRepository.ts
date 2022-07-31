import CoinbaseDataRepository from "../domain/CoinbaseDataRepository";
import CoinbaseData from "../domain/CoinbaseData";
import CoinbaseDataModel from "./CoinbaseDataModel";

export default class PostgresCoinbaseDataRepository implements CoinbaseDataRepository{
    public async create(coinbaseData: CoinbaseData): Promise<CoinbaseData> {
        const coinbaseDataModel = await CoinbaseDataModel.create({
            apiKey: coinbaseData.apiKey,
            apiSecret: coinbaseData.apiSecret,
            apiPassPhrase: coinbaseData.apiPassPhrase,
            portfolioId: coinbaseData.portfolioId,
            accountId: coinbaseData.accountId,
        })

        return this.transformToCoinbaseData(coinbaseDataModel);
    }

    public async get(id: string): Promise<CoinbaseData | null> {
        const coinbaseDataModel = await CoinbaseDataModel.findByPk(parseInt(id));
        return this.handleFinding(coinbaseDataModel);
    }

    private handleFinding(coinbaseDataModel: CoinbaseDataModel | null): CoinbaseData | null{
        if(!coinbaseDataModel)
            return null

        return this.transformToCoinbaseData(coinbaseDataModel);
    }

    private transformToCoinbaseData(coinbaseDataModel: CoinbaseDataModel): CoinbaseData {
        return new CoinbaseData(
            coinbaseDataModel.apiKey,
            coinbaseDataModel.apiSecret,
            coinbaseDataModel.apiPassPhrase,
            coinbaseDataModel.portfolioId,
            coinbaseDataModel.accountId,
            coinbaseDataModel.id.toString()
        );
    }
}
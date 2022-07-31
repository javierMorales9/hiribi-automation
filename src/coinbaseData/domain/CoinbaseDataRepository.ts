import CoinbaseData from "./CoinbaseData";

export default interface CoinbaseDataRepository{
    get: (id: string) => Promise<CoinbaseData | null>;
    create: (coinbaseData: CoinbaseData) => Promise<CoinbaseData>;
}
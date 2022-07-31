import CoinbaseData from "./CoinbaseData";

export default interface CoinbaseDataRepository{
    create: (coinbaseData: CoinbaseData) => Promise<CoinbaseData>;
}
import {CoinbasePro} from 'coinbase-pro-node';
import dotenv from "dotenv";

dotenv.config();

if(!process.env.COINBASE_API_KEY) throw new Error("Incorrect api key");
if(!process.env.COINBASE_API_SECRET) throw new Error("Incorrect api secret");
if(!process.env.COINBASE_API_PASPHRASE) throw new Error("Incorrect api passphrase");

const client = new CoinbasePro({
    apiKey: process.env.COINBASE_API_KEY,
    apiSecret: process.env.COINBASE_API_SECRET,
    passphrase: process.env.COINBASE_API_PASPHRASE,
    useSandbox: true,
});

client.rest.account.listAccounts().then(accounts => {
  console.log(accounts);
});
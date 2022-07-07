import dotenv from "dotenv";
import {CoinbasePro} from 'coinbase-pro-node';

dotenv.config();

const apiKey = process.env.COINBASE_API_KEY;
const apiSecret = process.env.COINBASE_API_SECRET;
const apiPassPhrase = process.env.COINBASE_API_PASPHRASE;

if (!apiKey) throw new Error("Invalid apiKey");
if (!apiSecret) throw new Error("Invalid apiSecret");
if (!apiPassPhrase) throw new Error("Invalid PassPhrase");

const client = new CoinbasePro({
  apiKey,
  apiSecret,
  passphrase: apiPassPhrase,
  useSandbox: true,
});

client.rest.account.listAccounts()
.then(accounts => {
console.log(accounts);
});
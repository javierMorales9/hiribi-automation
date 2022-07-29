import dotenv from "dotenv";
import { DataTypes, Model, Sequelize } from 'sequelize';
import { CoinbasePro } from 'coinbase-pro-node';

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
        //console.log(accounts);
    });

//Creating the sequelize session
const sequelize = new Sequelize('postgres://'
    + process.env.POSTGRES_USER + ':'
    + process.env.POSTGRES_PASSWORD
    +'@localhost:5432/hiribi'
);

sequelize.authenticate()
    .then(() => {
        console.log("Postgres session has been created");
        class User extends Model{
            declare id: number;
            declare firstName: string;
            declare lastName: string;
        }
        User.init({
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lastName: {
                    type: DataTypes.STRING,
                }
            },
            {sequelize}
        );

        sequelize.sync();
        const user1 = new User({id: 1, firstName: "Pedrito", lastName: "Jimenez"});
        const user2 = new User({id: 2, firstName: "Paquito", lastName: "Hernández"});
        user1.save();
        user2.save();
        console.log("Retrieving the users from the database");
    })
    .catch((err) => {
        console.log("An error occurred");
    });

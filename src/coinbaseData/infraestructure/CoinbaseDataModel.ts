import {container} from "tsyringe";
import {SequelizeWrapper} from "../../shared/sequelize/SequelizeWrapper";
import {DataTypes, Model} from "sequelize";
import AccountModel from "../../account/infraestructure/AccountModel";

const sequelize = container.resolve(SequelizeWrapper).sequelize;

class CoinbaseDataModel extends Model{
    declare id: string;
    declare apiKey: string;
    declare apiSecret: string;
    declare apiPassPhrase: string;
    declare portfolioId: string;
    declare accountId: string;
}

CoinbaseDataModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        apiKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apiSecret: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apiPassPhrase: {
            type: DataTypes.STRING,
            allowNull: false
        },
        portfolioId: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: "coinbasedata"
    }
)

CoinbaseDataModel.belongsTo(AccountModel, {
    foreignKey: 'accountId'
});

export default CoinbaseDataModel;
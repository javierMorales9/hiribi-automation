import "reflect-metadata";
import {DataTypes, Model, Sequelize} from "sequelize";
import {container} from "tsyringe";
import {SequelizeWrapper} from "../../shared/sequelize/SequelizeWrapper";
import CoinbaseDataModel from "../../coinbaseData/infraestructure/CoinbaseDataModel";

const sequelize = container.resolve(SequelizeWrapper).sequelize;
class AccountModel extends Model{
    declare id: number;
    declare name: string;
    declare email: string;
    declare encryptedPassword: string;
}

AccountModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        encryptedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: "account"
    }
);

AccountModel.hasOne(CoinbaseDataModel, {
    onDelete: 'CASCADE'
});

export default AccountModel;
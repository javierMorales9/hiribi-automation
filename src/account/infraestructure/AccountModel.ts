import "reflect-metadata";
import {DataTypes, Model} from "sequelize";
import {container} from "tsyringe";
import {SequelizeWrapper} from "../../shared/sequelize/SequelizeWrapper";

const sequelize = container.resolve(SequelizeWrapper).sequelize;
class AccountModel extends Model{}

AccountModel.init(
    {
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
        sequelize
    }
);

export default AccountModel;
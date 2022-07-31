import "reflect-metadata";
import {DataTypes, Model, Sequelize} from "sequelize";
import {container, inject} from "tsyringe";
import SequelizeWrapper from "../../shared/sequelize/SequelizeWrapper";

const sequelizeWrapper = container.resolve<SequelizeWrapper>("SequelizeWrapper");
const sequelize = sequelizeWrapper.sequelize;
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
import {Sequelize} from "sequelize";

export default interface SequelizeWrapper{
    readonly sequelize: Sequelize;
    start: () => Promise<void>;
    close: () => Promise<void>
}
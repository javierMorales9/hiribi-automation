import "reflect-metadata";
import { Sequelize } from "sequelize";
import {singleton} from "tsyringe";
import SequelizeWrapper from "./SequelizeWrapper";

@singleton()
export class SequelizeWrapperTest implements SequelizeWrapper{
    public readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            'postgres://' +
            process.env.POSTGRES_USER + ':' +
            process.env.POSTGRES_PASSWORD +
            '@localhost:5432/hiribitest'
        );
    }

    public async start(){
        try{
            await this.sequelize.sync({force: true});
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch(error){
            console.error('Unable to connect to the database:', error);
        }
    }

    public async close(){
        await this.sequelize.close();
    }
}
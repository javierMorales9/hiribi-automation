import "reflect-metadata";
import { Sequelize } from "sequelize";
import {singleton} from "tsyringe";

@singleton()
export class SequelizeWrapper{
    public readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize('postgres://'
            + process.env.POSTGRES_USER + ':'
            + process.env.POSTGRES_PASSWORD
            +'@localhost:5432/hiribi'
        );
    }

    public async start(){
        try{
            await this.sequelize.authenticate();
            await this.sequelize.sync({ force: true })
            console.log('Connection has been established successfully.');
        }
        catch(error){
            console.error('Unable to connect to the database:', error);
        }
    }
}
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import Server from "./server";
import {container, inject, injectable, Lifecycle, registry} from "tsyringe";
import {InMemoryAccountRepository} from "./account/infraestructure/InMemoryAccountRepository";

@registry([
    {token: 'AccountRepository', useClass: InMemoryAccountRepository, options:{lifecycle: Lifecycle.Singleton}}
])
@injectable()
export default class Main{
    constructor(@inject(Server)private server: Server) {
        this.server.start();
    }
}

const server = container.resolve(Server);
new Main(server);
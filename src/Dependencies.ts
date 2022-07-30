import {InMemoryAccountRepository} from "./account/infraestructure/InMemoryAccountRepository";

//TODO: Introduce a D. Inj. framework and delete this file

export const inMemoryAccountRepository = new InMemoryAccountRepository();
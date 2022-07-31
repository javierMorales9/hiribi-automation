import "reflect-metadata";
import PostgresAccountRepository from "../../../../src/account/infraestructure/PostgresAccountRepository";
import {Account} from "../../../../src/account/domain/Account";
import {container} from "tsyringe";
import {SequelizeWrapper} from "../../../../src/shared/sequelize/SequelizeWrapper";

const sequelizeWrapper = container.resolve(SequelizeWrapper);

const postgresAccountRepository: PostgresAccountRepository
    = new PostgresAccountRepository();

const sampleAccount: Account = {
    id: "0",
    name: "Jogo",
    email: "Cago",
    encryptedPassword: "Qudi",
}

beforeAll(async () => {
    await sequelizeWrapper.start();
})

afterAll(async () => {
    await sequelizeWrapper.close();
})

describe("Postgres account repository", () => {
    it('should create an account', async function () {
        await postgresAccountRepository.create(sampleAccount);
        expect(1).toBe(1);
    });
})
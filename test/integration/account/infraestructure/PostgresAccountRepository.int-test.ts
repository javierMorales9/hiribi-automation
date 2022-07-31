import "reflect-metadata";
import PostgresAccountRepository from "../../../../src/account/infraestructure/PostgresAccountRepository";
import {Account} from "../../../../src/account/domain/Account";
import {container} from "tsyringe";
import {SequelizeWrapper} from "../../../../src/shared/sequelize/SequelizeWrapper";
import AccountModel from "../../../../src/account/infraestructure/AccountModel";

const sequelizeWrapper = container.resolve(SequelizeWrapper);

const postgresAccountRepository: PostgresAccountRepository
    = new PostgresAccountRepository();

const sampleAccount: Account = {
    name: "Jogo",
    email: "Cago",
    encryptedPassword: "Qudi",
}

beforeAll(async () => {
    await sequelizeWrapper.start();
})

afterAll(async () => {
    await sequelizeWrapper.sequelize.close();
})

beforeEach(async () => {
    await AccountModel.destroy({
        where: {},
        truncate: true
    });
});

describe("Postgres account repository", () => {
    it('should create an account', async function () {
        let count = (await AccountModel.findAll()).length;
        expect(count).toBe(0);

        const account
            = await postgresAccountRepository.create(sampleAccount);

        count = (await AccountModel.findAll()).length;
        expect(count).toBe(1);
        expect(account.id).toBe("1");
        expect(account.name).toBe("Jogo");
    });

    it('should retrieve the account given the id', async function () {
        const id = (await AccountModel.create({
            name: "Jogo",
            email: "Cago",
            encryptedPassword: "Qudi",
        })).id.toString();

        const account = await postgresAccountRepository.get(id);
        if(!account)
            throw new Error("Is null");

        expect(account.name).toBe("Jogo");
        expect(account.id).toBe(id);
    });

    it('should return null if the id does not exist', async function () {
        const account = await postgresAccountRepository.get("3234");
        expect(account).toBeNull();
    });

    it('should retrieve the account given the name', async function () {
        await AccountModel.create({
            name: "Jogo",
            email: "Cago",
            encryptedPassword: "Qudi",
        });

        const account
            = await postgresAccountRepository.getByAccountName("Jogo");
        if(!account)
            throw new Error("Is null");

        expect(account.name).toBe("Jogo");
        expect(account.email).toBe("Cago");
    });

    it('should return null if the name does not exist', async function () {
        const account = await postgresAccountRepository.getByAccountName("345");
        expect(account).toBeNull();
    });
})
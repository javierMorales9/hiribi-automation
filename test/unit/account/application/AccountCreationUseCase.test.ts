import {AccountRequest} from "../../../../src/account/domain/AccountRequest";
import {AccountCreationUseCase} from "../../../../src/account/application/AccountCreationUseCase";
import bcrypt from "bcrypt";
import {container} from "tsyringe";
import {AccountRepository} from "../../../../src/account/domain/AccountRepository";
import {mockAccount, MockAccountRepository} from "../MockAccountRepository";

container.register<AccountRepository>("AccountRepository", MockAccountRepository);
const accountCreationUseCase = container.resolve(AccountCreationUseCase);

describe("Account Creation Use case", () =>{

    it('should create the account', async function () {
        const accountRequest: AccountRequest = {
            name: "Javi",
            email: "javi@gmail.com",
            password: "mermelada"
        }
        const actualAccount = await accountCreationUseCase.create(accountRequest);

        expect(actualAccount.name).toEqual(accountRequest.name);
        expect(actualAccount.email).toEqual(accountRequest.email);
        expect(actualAccount.id).toBeDefined();
        expect(actualAccount.encryptedPassword).not.toBe("");
    });

    it('should throw an exception if the name of the new account already existed', async function() {
        expect.assertions(1);
        const accountRequest: AccountRequest ={
            name: mockAccount.name,
            email: mockAccount.email,
            password: "memelada"
        }

        try{
            await accountCreationUseCase.create(accountRequest);
        }
        catch(err){
            expect(1).toBe(1);
        }
    });

    it('should the password be encrypted', async function () {
        const accountRequest: AccountRequest = {
            name: "Javi",
            email: "javi@gmail.com",
            password: "mermelada"
        }
        const savedAccount = await accountCreationUseCase.create(accountRequest);

        const actualPassword = savedAccount.encryptedPassword;
        const expectedPassword = "$2a$12$fw35wloIOT1eMdJNFsaApOueMbuTFZBEOI/NOIBz38kMgAJgSqmUm";

        const equalPassword = bcrypt.compare(actualPassword, expectedPassword);

        expect(equalPassword).toBeTruthy();
    });
});
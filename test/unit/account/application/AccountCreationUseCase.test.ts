import {AccountRequest} from "../../../../src/account/domain/AccountRequest";
import {AccountCreationUseCase} from "../../../../src/account/application/AccountCreationUseCase";
import {AccountRepository} from "../../../../src/account/domain/AccountRepository";
import {MockAccountRepository} from "../MockAccountRepository";
import {Account} from "../../../../src/account/domain/Account";
import bcrypt from "bcrypt";

const accountRepository: AccountRepository = new MockAccountRepository();
const accountCreationUseCase = new AccountCreationUseCase(accountRepository);

describe("Account Creation Use case", () =>{

    it('should create the account', async function () {
        const accountRequest: AccountRequest = {
            name: "Javi",
            email: "javi@gmail.com",
            password: "mermelada"
        }
        await accountCreationUseCase.create(accountRequest);
        const actualAccount = await accountRepository.get("id");
        const expectedAccount = await Account.fromAccountRequest(accountRequest);

        expect(actualAccount.name).toEqual(expectedAccount.name);
        expect(actualAccount.email).toEqual(expectedAccount.email);
    });

    it('should the password be encrypted', async function () {
        const accountRequest: AccountRequest = {
            name: "Javi",
            email: "javi@gmail.com",
            password: "mermelada"
        }
        await accountCreationUseCase.create(accountRequest);

        const actualPassword = (await accountRepository.get("id")).encryptedPassword;
        const expectedPassword = "$2a$12$fw35wloIOT1eMdJNFsaApOueMbuTFZBEOI/NOIBz38kMgAJgSqmUm";

        const equalPassword = bcrypt.compare(actualPassword, expectedPassword);

        expect(equalPassword).toBeTruthy();
    });
});
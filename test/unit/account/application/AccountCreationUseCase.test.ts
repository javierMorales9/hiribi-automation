import {AccountRequest} from "../../../../src/account/domain/AccountRequest";
import {AccountCreationUseCase} from "../../../../src/account/application/AccountCreationUseCase";
import {AccountRepository} from "../../../../src/account/domain/AccountRepository";
import {MockAccountRepository} from "../MockAccountRepository";
import {Account} from "../../../../src/account/domain/Account";

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
        const expectedAccount = Account.fromAccountRequest(accountRequest);

        expect(actualAccount).toEqual(expectedAccount);
    });

    it('should the password be encrypted', function () {
        expect(1).toBe(2);
    });
})
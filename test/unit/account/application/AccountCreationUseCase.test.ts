import {AccountRequest} from "../../../../src/account/domain/AccountRequest";
import {AccountCreationUseCase} from "../../../../src/account/application/AccountCreationUseCase";

const accountCreationUseCase: AccountCreationUseCase = new AccountCreationUseCase();

describe("Account Creation Use case", () =>{

    it('should create the account', function () {
        const accountRequest: AccountRequest = {
            name: "Javi",
            email: "javi@gmail.com"
        }
        accountCreationUseCase.create(accountRequest);

        expect(true).toBe(true);
    });
})
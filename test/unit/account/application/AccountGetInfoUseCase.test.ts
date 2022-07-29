import {AccountGetInfoUseCase} from "../../../../src/account/application/AccountGetInfoUseCase";
import {MockAccountRepository, mockAccount} from "../MockAccountRepository";

const accountGetInfoUseCase =
    new AccountGetInfoUseCase(new MockAccountRepository());

describe('get info from account use case', function () {

    it('should return the info from the account', async function () {
        const actualAccount = await accountGetInfoUseCase.get("id");
        const expectedAccount = mockAccount;

        expect(actualAccount).toEqual(expectedAccount);
    });
});
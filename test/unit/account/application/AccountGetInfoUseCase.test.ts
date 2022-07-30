import {AccountGetInfoUseCase} from "../../../../src/account/application/AccountGetInfoUseCase";
import {MockAccountRepository, mockAccount} from "../MockAccountRepository";

const accountGetInfoUseCase =
    new AccountGetInfoUseCase(new MockAccountRepository());

describe('get info from account given the id use case', function () {

    it('should return the info from the account', async function () {
        const actualAccount = await accountGetInfoUseCase.get("id");
        const expectedAccount = mockAccount;

        expect(actualAccount).toEqual(expectedAccount);
    });

    it('should throw an error if no account exist with that id', async function () {
        expect.assertions(1);
        try{
            await accountGetInfoUseCase.get("invalidId");
        }
        catch(err){
            expect(1).toBe(1);
        }
    });

});

describe.skip('get info from account given the account name use case', function () {
    it('should return an account given the name', function () {

    });

    it('should throw an error if no account exist with that name', function () {

    });
});

import {AccountGetInfoUseCase} from "../../../../src/account/application/AccountGetInfoUseCase";
import {MockAccountRepository, mockAccount} from "../MockAccountRepository";

const accountGetInfoUseCase =
    new AccountGetInfoUseCase(new MockAccountRepository());

describe('get info from account given the id use case', function () {

    it('should return the info from the account', async function () {
        const actualAccount = await accountGetInfoUseCase.get("0");
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

describe('get info from account given the account name use case', function () {

    it('should return an account given the name', async function () {
        const theName = "Juanito";
        const actualAccount = await accountGetInfoUseCase.getAccountByName(theName);
        expect(actualAccount.name).toBe(mockAccount.name);
    });

    it('should throw an error if no account exist with that name', async function () {
        const theName = "Pedrito";
        expect.assertions(1);

        try{
            await accountGetInfoUseCase.getAccountByName(theName);
        }catch(err){
           expect(1).toBe(1);
        }
    });
});

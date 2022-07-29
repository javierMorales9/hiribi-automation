import {AccountGetInfoUseCase} from "../../../../src/account/application/AccountGetInfoUseCase";
import {AccountRepository} from "../../../../src/account/domain/AccountRepository";
import {MockAccountRepository} from "../MockAccountRepository";

const accountRepository: AccountRepository = new MockAccountRepository();
const accountGetInfoUseCase = new AccountGetInfoUseCase(accountRepository);

describe('get info from account use case', function () {

    it('should return the info from the account', function () {
        accountGetInfoUseCase.get();
    });
});
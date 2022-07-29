import {AccountRequest} from "../domain/AccountRequest";

export class AccountCreationUseCase{

    public create(accountRequest: AccountRequest): Promise<void> {

        //const account = new Account();

        return Promise.resolve();
    }
}
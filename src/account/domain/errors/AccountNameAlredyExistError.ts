import {CustomError} from "../../../shared/errorHandling/GeneralError";

export default class AccountNameAlredyExistError extends CustomError{
    constructor() {
        super("Account name alredy exist", 400);
    }
}
import {CustomError} from "../../shared/errorHandling/GeneralError";

export class BadAccountInformationError extends CustomError{
    constructor() {
        super("The account information was bad", 400);
    }
}
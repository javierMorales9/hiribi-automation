import {CustomError} from "../../../shared/errorHandling/GeneralError";

export class IncorrectLoginDataError extends CustomError{

    constructor() {
        super("Incorrect Login Data", 400);
    }

}
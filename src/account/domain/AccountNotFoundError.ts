import {CustomError} from "../../shared/errorHandling/GeneralError";

export class AccountNotFoundError extends CustomError{

    constructor(id: number) {
        super(
            "Account with id " + id +" not found",
            400
            );
    }
}
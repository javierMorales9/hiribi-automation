import {CustomError} from "../../../shared/errorHandling/GeneralError";

export class AccountNotFoundError extends CustomError{

    constructor(field: string, id: string) {
        super(
            "Account with " + field + " " + id + " not found",
            400
            );
    }
}
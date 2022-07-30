import {CustomError} from "../errorHandling/GeneralError";

export class IncorrectPasswordError extends CustomError{
    constructor() {
        super(
            "Incorrect password",
            400
        );
    }
}
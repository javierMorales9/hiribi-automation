import {CustomError} from "./GeneralError";

export default class RecordNotFoundException extends CustomError{
    constructor(entity: string, field: string, id: string) {
        super(
            entity + " with " + field + " " + id + " not found",
            400
        );
    }
}
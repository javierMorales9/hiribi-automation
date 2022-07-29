import HttpStatusCodes from "http-status-codes";

export class CustomError extends Error {
    private readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
    private readonly Msg;

    constructor(msg: string, httpStatus: number) {
        super(msg);

        this.HttpStatus = httpStatus;
        this.Msg = msg;
    }

    public getHttpStatus(): number {
        return this.HttpStatus;
    }

    public getMsg(): string {
        return this.Msg;
    }
}

export class ElementNotFoundError extends CustomError {
    constructor(type?: string) {
        const objType = type ?? "element";
        const Msg =
            "A " +
            objType +
            " with the given properties does not exist.";
        const HttpStatus = HttpStatusCodes.NOT_FOUND;

        super(Msg, HttpStatus);
    }
}

import { HttpCodes } from "#src/enums/http.js";

export class HttpError extends Error {
    constructor(private readonly code: HttpCodes) {
        super(`Request failed with status ${HttpCodes[code]}`)
    }

    public getCode(): HttpCodes {
        return this.code;
    }
}
import { HttpCodes } from "#src/enums/http.js";
import { HttpError } from "./HttpError.js";

export const HttpErrorHandler = (res, e: Error) => {
    if (e instanceof HttpError) {
        res.status(e.getCode());
        res.send(e.message);
    } else {
        res.status(HttpCodes.INTERNAL_ERROR);
        res.send('Server internal error');
    }
}
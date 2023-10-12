import { HttpCodes } from "#src/enums/http.js";
import { HttpError } from "#src/errors/HttpError.js";
import { HttpErrorHandler } from "#src/errors/HttpErrorHandler.js";
import { ILoggerFactory } from "#src/interfaces/ILogger";

export default function NotFoundHandler(lf: ILoggerFactory) {
    return (req, res) => {
        lf().warn('Invalid url', req.url);
        HttpErrorHandler(res, new HttpError(HttpCodes.NOT_FOUND));
    }
}
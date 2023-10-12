import { HttpCodes } from '#src/enums/http.js';
import { HttpError } from '#src/errors/HttpError.js';
import { IConfig } from '#src/interfaces/IConfig';
import { ILoggerFactory } from '#src/interfaces/ILogger';
import { S3Repository } from '#src/repository/S3Repository.js';
import { S3ClientResolver } from '#src/resolvers/S3ClientResolver.js';
import { S3Service } from '#src/services/s3/S3Service.js';

const errorHandler = (res, e: Error) => {
    if (e instanceof HttpError) {
        res.status(e.getCode());
        res.send(e.message);
    } else {
        res.status(HttpCodes.INTERNAL_ERROR);
        res.send('Server internal error');
    }
}

function s3(config: IConfig, lf: ILoggerFactory);
function s3(config: IConfig, lf: ILoggerFactory, bucket: string);
function s3(config: IConfig, lf: ILoggerFactory, bucket?: string) {
    const logger = lf();
    const client = new S3ClientResolver(config, lf).resolve();
    const repository = new S3Repository(client, lf);
    const service = new S3Service(repository, lf);
    
    return async (req, res) => {
        const fileName = req.params.filename;
        const fileBucket = bucket ?? req.params.bucket;

        try {
            const stream = await service.readFile(fileBucket, fileName);

            stream.on('error', (error: Error) => errorHandler(res, error));
            stream.pipe(res, { end: true });

            logger.info(`Proxied file "${fileName}" from bucket "${fileBucket}"`);
        } catch(e) {
            errorHandler(res, e);

            logger.error(`Failed to proxy file "${fileName}" from bucket "${fileBucket}"`)
        }
    }
}


export default s3;
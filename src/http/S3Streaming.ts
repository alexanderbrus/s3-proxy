import { IConfig } from '#src/interfaces/IConfig';
import { ILoggerFactory } from '#src/interfaces/ILogger';
import { S3Repository } from '#src/repository/S3Repository.js';
import { S3ClientResolver } from '#src/resolvers/S3ClientResolver.js';
import { S3Service } from '#src/services/s3/S3Service.js';

export default function(config: IConfig, lf: ILoggerFactory) {
    const client = new S3ClientResolver(config, lf).resolve();
    const repository = new S3Repository(client, lf);
    const service = new S3Service(repository, lf);
    
    return async (req, res) => {
        const stream = await service.readFile(req.params.bucket, req.params.filename);
        stream.on('error', (error: Error) => res.end(error))
        stream.pipe(res, { end: true });
    }
}

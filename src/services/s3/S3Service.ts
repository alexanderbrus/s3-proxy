import { ILogger, ILoggerAware, ILoggerFactory } from "#src/interfaces/ILogger";
import { S3Repository } from "#src/repository/S3Repository.js";

export class S3Service implements ILoggerAware {
    constructor(private readonly repository: S3Repository, private readonly lf : ILoggerFactory) {}

    public getLogger(): ILogger {
        return this.lf();
    }
    
    async readFile(bucket: string, name: string): Promise<NodeJS.ReadableStream> {
        const stream = await this.repository.readStream(name, bucket);    
        stream.on('error', () => this.getLogger().error('Failed to proxy file'));
        return stream;
    }    
}
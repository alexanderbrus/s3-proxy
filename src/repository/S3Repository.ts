import { ILogger, ILoggerAware, ILoggerFactory } from '#src/interfaces/ILogger';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export class S3Repository implements ILoggerAware
{
  constructor(
    private readonly client: S3Client,
    private readonly lf: ILoggerFactory
  ) {}

  public getLogger(): ILogger {
    return this.lf();
  }

  public async readStream(name: string, bucket: string): Promise<NodeJS.ReadableStream> {
    const item = await this.client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: name
      })
    );

    return item.Body as Readable;
  }
}

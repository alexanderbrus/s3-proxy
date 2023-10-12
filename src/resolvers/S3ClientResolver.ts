import { IConfig } from "#src/interfaces/IConfig";
import { ILogger, ILoggerAware, ILoggerFactory } from "#src/interfaces/ILogger";
import { IResolver } from "#src/interfaces/IResolver";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

export class S3ClientResolver implements IResolver<S3ClientConfig>,ILoggerAware {
    constructor(private readonly config: IConfig, private readonly lf: ILoggerFactory) {}

    public getLogger(): ILogger {
      return this.lf()
    }

    private getConfig(): S3ClientConfig {
        return {
            forcePathStyle: true,
            region: this.config.PROXY_S3_REGION,
            ...(this.config.PROXY_S3_ENDPOINT ? { endpoint: this.config.PROXY_S3_ENDPOINT, tls: false } : {}),
            ...(this.config.PROXY_S3_KEY && this.config.PROXY_S3_SECRET
              ? {
                  credentials: {
                    accessKeyId: this.config.PROXY_S3_KEY,
                    secretAccessKey: this.config.PROXY_S3_SECRET
                  }
                }
              : {})
          };
    }

    resolve(): S3Client {
        const config = this.getConfig();
        return new S3Client(config);
    }
}
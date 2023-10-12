import { IConfig } from "#src/interfaces/IConfig";
import { IResolver } from "#src/interfaces/IResolver";
import { configDotenv } from "dotenv";

configDotenv();

export class ConfigResolver implements IResolver<IConfig> {
    resolve(): IConfig {
        return {
            PORT: parseInt(process.env.PORT),
            PROXY_S3_KEY: process.env.PROXY_S3_KEY,
            PROXY_S3_REGION: process.env.PROXY_S3_REGION,
            PROXY_S3_SECRET: process.env.PROXY_S3_SECRET,
            PROXY_S3_BUCKET: process.env.PROXY_S3_BUCKET,
            PROXY_S3_ENDPOINT: process.env.PROXY_S3_ENDPOINT,
        };
    }
}

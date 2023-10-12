import express from 'express';
import HealthCheck from './http/HealthCheck.js';
import S3StreamingHandler from './http/S3Streaming.js';
import { ConfigResolver } from './resolvers/ConfigResolver.js';
import { ConsoleLogger } from './services/logger/ConsoleLogger.js';

const logger = new ConsoleLogger();
const loggerFactory = () => logger;

const configResolver = new ConfigResolver();
const config = configResolver.resolve();
const port = config.PORT;

const app = express();

app.get('/health-check', HealthCheck(loggerFactory));
app.get('/:filename(.*)', S3StreamingHandler(config, loggerFactory, config.PROXY_S3_BUCKET));

app.listen(port, () => logger.info(`Server started at port ${port}`));
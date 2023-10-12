import { ILoggerFactory } from "#src/interfaces/ILogger";

export default function(lf: ILoggerFactory) {
    const logger = lf();
    
    return (req, res) => {
        logger.info('Health check');
        res.send('OK');
    }
}
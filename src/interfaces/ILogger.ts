export interface ILogger {
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}

export type ILoggerFactory = (...args: unknown[]) => ILogger;

export interface ILoggerAware {
    getLogger(...args: unknown[]): ILogger
}
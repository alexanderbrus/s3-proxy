import { ILogger } from "../../interfaces/ILogger";

export class ConsoleLogger implements ILogger {
    info(...args) {
        console.info(...args)
    }

    warn(...args: any[]): void {
        console.warn(...args);
    }

    error(...args: any[]): void {
        console.error(...args);
    }
}
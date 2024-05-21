import type { Logger as WinstonLogger } from 'winston';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, align, printf } = format;
class Logger {
    private static instance: Logger;
    private winstonLogger: WinstonLogger;
    private constructor() {
        const formatPrint = printf(({ level, message, context, requestId, timestamp }) => {
            return `${timestamp}   ${level.toUpperCase()} - ${context} - ${requestId} - ${message}`;
        });
        this.winstonLogger = createLogger({
            format: combine(timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), formatPrint, align()),
            transports: [new transports.Console()]
        });
    }

    static get Instance() {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    getLogger() {
        return this.winstonLogger;
    }
}

export default Logger;

import winston, { createLogger, transports } from "winston";

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

const clogger = createLogger({
    level: process.env.LOG_LEVEL,
    levels: logLevels,
});


if (process.env.NODE_ENV === 'production') {
    clogger.add(
        new transports.Console({format: winston.format.json()})
    )
}
else{
    clogger.add(
        new transports.Console({format: winston.format.simple()})
    )
}

export const logger = clogger;
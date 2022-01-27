const { createLogger, transports, format } = require("winston");
//winston에서 내가 쓰고싶은 놈들만 골라가지고 온것임
const { combine, timestamp, label, printf, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "백엔드는 어려워",
    }),
    //   colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: "./app/logs/access.log",
    level: "info",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

logger.stream = {
  write: (message) => logger.info(message),
};
module.exports = logger;

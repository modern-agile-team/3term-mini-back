"use strict";

const app = require("../app");
const PORT = process.env.PORT || 8080;
const logger = require("../src/config/logger");

app.listen(PORT, () => {
  logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});

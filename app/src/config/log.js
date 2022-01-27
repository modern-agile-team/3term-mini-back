const fs = require("fs");
const appRoot = require("app-root-path");
//기본 모듈중 루트경로를 가지고 올 수 있게 해주는 모듈
const accessLogStream = fs.createWriteStream(`${appRoot}/app/logs/access.log`, {
  flags: "a",
});

module.exports = accessLogStream;

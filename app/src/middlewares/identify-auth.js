"use strict";

const loginCheck = require("./login-auth");

const identityCheck = (req, res, next) => {
  let token = req.headers["authorization"] || "";
  // req.headers가 있으면 req.headers["authorization"] 을 token에 저장하고 없으면 "" 을 저장함

  if (token === "null") token = "";

  if (token) {
    loginCheck.loginCheck(req, res, next);
  } else next();
};

module.exports = {
  identityCheck,
};

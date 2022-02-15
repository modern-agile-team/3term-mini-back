"use strict";

const Auth = require("../models/services/Auth/Auth");
const logger = require("../config/logger");
const loginCheck = async (req, res, next) => {
  // 요청 헤더의 토큰 값을 가져와 loginCheck에 저장
  const token = req.headers["authorization"] || "";

  // 토큰이 존재하지 않으면 로그인이 되어있지 않은 상태이므로 인증 실패시켜야함
  if (token.length === 0) {
    logger.error(
      `login-check 401 : JWT 토큰이 존재하지 않습니다. 로그인 후 이용해 주세요.`
    );
    return res.status(401).json({
      success: false,
      msg: "JWT 토큰이 존재하지 않습니다. 로그인 후 이용해 주세요",
    });
  }

  // 토큰이 존재한다면 이전에 만들어 놓은 verifyJWT에 토큰 값을 넘겨 검사
  const auth = await Auth.verifyJWT(token);

  // 토큰 기간이 만료 되었을 경우
  if (auth.err === "jwt expired") {
    logger.error(
      `login-check 401: 유효기간이 만료된 토큰입니다. 다시 로그인 후 이용해 주세요.`
    );
    return res.status(401).json({
      success: false,
      msg: "유효 시간이 만료된 토큰입니다. 다시 로그인 후 이용해주세요.",
    });
  }
  // 토큰이 유효하지 않은 경우
  if (auth.err === "invalid token") {
    logger.error(`login-check 401: 유효하지 않은 토큰입니다.`);
    return res.status(401).json({
      success: false,
      msg: "유효하지 않은 토큰입니다",
    });
  }
  // 클라이언트가 임의로 token을 입력한 경우
  if (auth.id === undefined) {
    logger.error(`login-check 401: 유효하지 않은 토큰입니다.`);
    return res.status(401).json({
      success: false,
      msg: "유효하지 않은 토큰입니다.",
    });
  }
  req.auth = auth;

  return next();
};

module.exports = { loginCheck };

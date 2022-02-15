"use strict";
// JWT 생성
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

class Auth {
  static async createJWT(user) {
    const payload = {
      id: user.id,
      name: user.name,
    };
    return jwt.sign(payload, SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
      issuer: "modern agile",
    });
  }
  static async verifyJWT(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return err;
    }
  }
}

module.exports = Auth;

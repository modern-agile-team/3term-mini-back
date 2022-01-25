"use strict";

const db = require("../../../config/mysql");

class UserStorage {
  static async getUserInfo(id) {
    const query = "SELECT * FROM users WHERE id = ?;";
    const existId = await db.query(query, [id]);

    return existId[0];
  }

  static async save(userInfo) {
    const query = `
      INSERT INTO users(id, password, mail, nickname, name) 
      VALUES(?, ?, ?, ?, ?);`;
    const isSave = await db.query(query, [
      userInfo.id,
      userInfo.psword,
      userInfo.email,
      userInfo.nickname,
      userInfo.name,
    ]);
    return;
  }
}
module.exports = UserStorage;

const subro = 123;

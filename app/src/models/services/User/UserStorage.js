"use strict";

const db = require("../../../config/mysql");

class UserStorage {
  static async getUserInfo(id) {
    const query = "SELECT id, password FROM users WHERE id = ?;";
    const existId = await db.query(query, [id]);

    return existId[0];
    //existID가 메타 데이터이기 때문에 existId[0]을 return 해줌으로써 User에 넘겨 줄 데이터는 client.id에 해당하는 열을 객체로 보낸 형태가 됨
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

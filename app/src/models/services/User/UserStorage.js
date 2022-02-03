"use strict";

const e = require("express");
const db = require("../../../config/mysql");

class UserStorage {
  static async getUserInfo(id) {
    try {
      const query = "SELECT id,password FROM users WHERE id = ?;";
      const existId = await db.query(query, [id]);
      if (existId[0].length) {
        return { success: true, info: existId[0][0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw err;
    }
  }

  // getQuery(type) {
  //   switch (type) {
  //     case (type = "id"):
  //       return "SELECT id FROM users WHERE  id = ?;";
  //     case (type = "nickname"):
  //       return "SELECT nickname FROM users WHERE  nickname = ?;";
  //     case (type = "mail"):
  //       return "SELECT mail FROM users WHERE  mail = ?;";
  //   }
  // }

  static async judgeDuplicateId(value) {
    const query = "SELECT id FROM users WHERE  id = ?;";
    try {
      console.log(query);
      const existId = await db.query(query, [value]);

      if (existId[0].length) {
        return { success: true };
      } else {
        return { success: false };
      }
      //existID가 메타 데이터이기 때문에 existId[0]을 return 해줌으로써 User에 넘겨 줄 데이터는 client.id에 해당하는 열을 객체로 보낸 형태가 됨
    } catch (err) {
      throw err;
    }
  }
  static async judgeDuplicateNickname(value) {
    try {
      const query = "SELECT nickname FROM users WHERE  nickname =?;";
      const existId = await db.query(query, [value]);

      if (existId[0].length) {
        return { success: true };
      } else {
        return { success: false };
      }
      //existID가 메타 데이터이기 때문에 existId[0]을 return 해줌으로써 User에 넘겨 줄 데이터는 client.id에 해당하는 열을 객체로 보낸 형태가 됨
    } catch (err) {
      throw err;
    }
  }
  static async judgeDuplicateMail(value) {
    try {
      const query = "SELECT mail FROM users WHERE mail = ?;";
      const existId = await db.query(query, [value]);
      if (existId[0].length) {
        return { success: true };
      } else {
        return { success: false };
      }
      //existID가 메타 데이터이기 때문에 existId[0]을 return 해줌으로써 User에 넘겨 줄 데이터는 client.id에 해당하는 열을 객체로 보낸 형태가 됨
    } catch (err) {
      throw err;
    }
  }

  static async save(userInfo) {
    try {
      const query = `
      INSERT INTO users(id, password, mail, nickname, name) 
      VALUES(?, ?, ?, ?, ?);`;
      const isSave = await db.query(query, [
        userInfo.id,
        userInfo.password,
        userInfo.mail,
        userInfo.nickname,
        userInfo.name,
      ]);
      if (isSave[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw err;
    }
  }
  // static async agreementCheckBox(checkArr) {
  //   try {
  //     const query = `INSERT INTO `;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
module.exports = UserStorage;

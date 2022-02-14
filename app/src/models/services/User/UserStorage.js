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
      throw {
        msg: "로그인 관련 서버에러입니다. 서버 개발자에게 문의하세요.",
      };
    }
  }

  static async isDuplicatedId(id) {
    // if (typeof id !== "string") throw new TypeError();
    const query = "SELECT id FROM users WHERE  id = ?;";
    try {
      const existedId = await db.query(query, [id]);
      return !!existedId[0].length;
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
      INSERT INTO users(id, password, mail, nickname, year_no, school_no) 
      VALUES(?, ?, ?, ?, ?, ?);`;
      const isSave = await db.query(query, [
        userInfo.id,
        userInfo.password,
        userInfo.mail,
        userInfo.nickname,
        userInfo.year,
        userInfo.school,
      ]);
      if (isSave[0].affectedRows) {
        return { success: true, msg: "회원가입이 정상적으로 수행되었습니다." };
      } else {
        return { success: false };
      }
    } catch (err) {
      console.log(err);
      throw {
        msg: "회원가입 관련 서버에러입니다. 서버 개발자에게 문의하세요.",
      };
    }
  }
}
module.exports = UserStorage;

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

  static async getUserCheck(dataBox) {
    try {
      const { id, essential, choice } = dataBox;
      if (essential === false || essential === undefined) {
        return {
          success: false,
          msg: "약관동의의 필수적인 요소가 등록되지 않았습니다.",
        };
      }
      const query2 = `SELECT * FROM users WHERE id = ?;`;
      const join = await db.query(query2, [id]);
      const query = `
      INSERT INTO agreement (user_no, essential, choice)
      VALUES(?, ?, ?);`;
      const data = await db.query(query, [join[0][0].no, essential, choice]);
      if (data[0].affectedRows) {
        return { success: true, msg: "약관동의가 정상적으로 등록되었습니다." };
      }
    } catch (err) {
      throw { msg: "약관동의 오류입니다, 서버 개발자에게 문의해주세요" };
    }
  }

  static async save(userInfo) {
    try {
      const { id, password, mail, nickname, year, school } = userInfo;
      const query = `
      INSERT INTO users(id, password, mail, nickname, year_no, school_no) 
      VALUES(?, ?, ?, ?, ?, ?);`;
      const isSave = await db.query(query, [
        id,
        password,
        mail,
        nickname,
        year,
        school,
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

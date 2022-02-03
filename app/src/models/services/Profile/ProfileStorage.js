"use strict";

const mysql = require("../../../config/mysql");

class ProfileStorage {
  static async selectProfile(profileUserNo) {
    try {
      const { userNo } = profileUserNo;
      const query = `SELECT users.name, users.nickname, users.mail, 
      (SELECT COUNT(*) FROM boards WHERE users.no = boards.no) AS boards 
      FROM users WHERE users.no = ?;`;
      const selectResult = await mysql.query(query, [userNo]);

      if (selectResult[0].length) {
        return { success: true, selectResult: selectResult[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        err: "프로필 조회 에러입니다. 서버 개발자에게 문의하세요.",
      };
    }
  }
}

module.exports = ProfileStorage;

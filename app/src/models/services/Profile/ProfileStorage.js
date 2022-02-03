"use strict";

const mysql = require("../../../config/mysql");

class ProfileStorage {
  static async selectProfile(profileUserNo) {
    try {
      const { userNo } = profileUserNo;
      const query = `SELECT users.name, users.nickname, users.mail, COUNT(boards.no) AS boards 
          FROM users 
          LEFT JOIN boards 
          ON users.no = boards.user_no 
          WHERE users.no=?`;
      const selectResult = await mysql.query(query, [userNo]);
      console.log(selectResult[0]);
      if (selectResult[0].length) {
        return { success: true, selectResult: selectResult[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { err: "Server Error", code: err.code };
    }
  }
}

module.exports = ProfileStorage;

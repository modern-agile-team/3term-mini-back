"use strict";

const mysql = require("../../../config/mysql");

class ProfileStorage {
  static async findOneByProfile(userByProfile) {
    try {
      //닉네임 이메일 게시물 사용자이름
      const query = `SELECT users.name, users.nickname, users.mail, COUNT(boards.no) AS boards 
          FROM users 
          LEFT JOIN boards 
          ON users.no = boards.user_no 
          WHERE users.no=?`;
      const infoProfile = await mysql.query(query, [userByProfile]);

      if (infoProfile[0].length) {
        return { success: true, infoProfile: infoProfile[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { err: "Server Error", code: err.code };
    }
  }
}

module.exports = ProfileStorage;

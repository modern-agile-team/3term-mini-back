"use strict";

const mysql = require("../config/mysql");

class ProfileStorage {
  static async findProfile(userNo) {
    try {
      const query = `SELECT * FROM profiles WHERE no = ?`;
      const infoProfile = await mysql.query(query, [userNo]);
      return infoProfile;
    } catch (err) {
      throw { err: "Server Error", code: err.code };
    }
  }
}

module.exports = ProfileStorage;

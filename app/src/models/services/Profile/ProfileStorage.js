"use strict";

const mysql = require("../../../config/mysql");

class ProfileStorage {
  static async findProfile() {
    try {
      const query = `SELECT * FROM boards`;
      const infoProfile = await mysql.query(query);
      console.log(infoProfile[0]);
      return infoProfile[0];
    } catch (err) {
      throw { err: "Server Error", code: err.code };
    }
  }
}

module.exports = ProfileStorage;

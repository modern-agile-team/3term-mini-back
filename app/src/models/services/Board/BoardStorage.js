"use strict";
const mysql = require("../../../config/mysql");

class BoardStorage {
  //2팀
  static async findAllByBoards() {
    const query = `SELECT * FROM boards;`;
    return await mysql.query(query);
  }
  static async findOneByBoardNo(no) {
    try {
      const query = `SELECT * FROM boards WHERE no = ?;`;
      return await mysql.query(query, [no]);
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  static async deleteBoard(no) {
    try {
      const query = `DELETE FROM boards WHERE no=? ;`;
      return await mysql.query(query, [no]);
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = BoardStorage;

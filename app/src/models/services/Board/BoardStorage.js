"use strict";
const mysql = require("../../../config/mysql");

class BoardStorage {
  static async findAllByBoards() {
    const query = `SELECT * FROM boards;`;
    return await mysql.query(query);
  }
}

module.exports = BoardStorage;

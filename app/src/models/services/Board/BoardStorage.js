"use strict";
const mysql = require("../../../config/mysql");

class BoardStorage {
  static async findAllByBoards() {
    const query = `SELECT * FROM boards;`;
    return await mysql.query(query);
  }

  //1팀-------------------------------------------------------
  static async createBoard(boardInfo) {
    const query = `INSERT INTO boards(user_no, title, description) VALUES(?, ?, ?);`;
    const create = await mysql.query(query, [
      boardInfo.userNo,
      boardInfo.title,
      boardInfo.description,
    ]);

    return create;
  }

  static async updateBoardView(userNo) {
    const query = `SELECT * FROM boards WHERE no = ? AND user_no = ?;`;
    const updateView = await mysql.query(query, [
      userNo.boardNo,
      userNo.userNo,
    ]);
    return updateView;
  }

  static async updateBoard(userInfo, boardInfo) {
    const query = `UPDATE boards SET title = ?, description = ?  WHERE no = ? AND user_no = ?;`;
    const update = await mysql.query(query, [
      boardInfo.title,
      boardInfo.description,
      userInfo.boardNo,
      userInfo.userNo,
    ]);

    return update;
  }
}

module.exports = BoardStorage;

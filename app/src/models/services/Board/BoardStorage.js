"use strict";
const mysql = require("../../../config/mysql");

class BoardStorage {
  static async findAllByBoards() {
    const query = `SELECT * FROM boards;`;
    return await mysql.query(query);
  }

  //1팀-------------------------------------------------------
  static async createBoard(boardInfo) {
    console.log(boardInfo);
    try {
      const query = `INSERT INTO boards(user_no, title, description) VALUES(?, ?, ?);`;
      const create = await mysql.query(query, [
        boardInfo.user_no,
        boardInfo.title,
        boardInfo.description,
      ]);
      if (create[0].affectedRows) {
        return { success: true };
      }
    } catch (err) {
      throw { err: "Server Error", code: err.code };
    }
  }

  static async findByThisBoardInfo(userNo) {
    const query = `SELECT * FROM boards WHERE no = ? AND user_no = ?;`;
    const findBoardInfo = await mysql.query(query, [
      userNo.boardNo,
      userNo.userNo,
    ]);
    return findBoardInfo;
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

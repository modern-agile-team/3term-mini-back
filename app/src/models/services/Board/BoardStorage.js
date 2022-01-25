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

  //1팀-------------------------------------------------------
  static async createBoard(boardInfo) {
    const { user_no, title, description } = boardInfo;
    try {
      const query = `INSERT INTO boards(user_no, title, description) VALUES(?, ?, ?);`;
      const create = await mysql.query(query, [user_no, title, description]);
      if (create[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { err: "서버에러입니다, 서버 개발자에게 문의해주세요" };
    }
  }

  static async findByThisBoardInfo(userNum) {
    const { boardNo, userNo } = userNum;
    try {
      const query = `SELECT title, description FROM boards WHERE no = ? AND user_no = ?;`;
      const findBoardInfo = await mysql.query(query, [boardNo, userNo]);
      return { success: true, boardInfo: findBoardInfo[0] };
    } catch (err) {
      throw { err: "서버에러입니다, 서버 개발자에게 문의해주세요" };
    }
  }

  static async updateBoard(userInfo, boardInfo) {
    const { title, description } = boardInfo;
    const { boardNo, userNo } = userInfo;
    try {
      const query = `UPDATE boards SET title = ?, description = ?  WHERE no = ? AND user_no = ?;`;
      const update = await mysql.query(query, [
        title,
        description,
        boardNo,
        userNo,
      ]);
      if (update[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { err: "서버 개발자에게 문의해주세요" };
    }
  }
}

module.exports = BoardStorage;

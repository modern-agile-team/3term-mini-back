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
  static async findCmtAllByBoardNo(boardNum) {
    try {
      const query = `
      SELECT replies.no AS cmtId, replies.user_no AS replyUserNo, description, DATE_FORMAT(in_date,'%m/%d %H:%i') AS inDate, users.nickname
      FROM replies 
      LEFT JOIN users
      ON replies.user_no = users.no
      WHERE board_no = ?`;
      const connect = await mysql.query(query, [boardNum.boardNo]);

      return { success: true, replyInfo: connect.shift() };
    } catch (err) {
      throw {
        msg: "게시판 댓글 조회 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }
  static async connectBoard(boardNum) {
    try {
      const query = `
      SELECT boards.no, boards.user_no AS boardWriteUserNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS boardInDate, users.nickname
	    FROM boards
      LEFT JOIN users
      ON boards.user_no = users.no
    	WHERE boards.no = ?`;
      const connect = await mysql.query(query, [boardNum.boardNo]);

      if (connect[0].length) {
        return { success: true, data: connect[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { msg: "게시판 접속 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }

  static async userConnectBoard(boardNum) {
    try {
      const query = `SELECT boards.user_no, boards.title, boards.description AS boardDesc, boards.in_date AS boardInDate, replies.description AS replyDesc, replies.in_date AS replyInDate, users.nickname 
    FROM boards
    RIGHT JOIN replies 
    on boards.no = replies.board_no
    JOIN users
    on replies.user_no = users.no WHERE boards.no = ?`;
      const connect = await mysql.query(query, [boardNum.boardNo]);
      if (connect[0].length) {
        return { boardInfo: connect[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        msg: "회원 게시판 접속 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }

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
      throw { err: "게시판 생성 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }

  static async findByThisBoardInfo(userNum) {
    const { boardNo, userNo } = userNum;
    try {
      const query = `SELECT title, description FROM boards WHERE no = ? AND user_no = ?;`;
      const findBoardInfo = await mysql.query(query, [boardNo, userNo]);
      if (findBoardInfo.length) {
        return { success: true, boardInfo: findBoardInfo[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        err: "게시글 수정 화면 에러입니다, 서버 개발자에게 문의해주세요.",
      };
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
      throw { err: "게시글 수정 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }
}

module.exports = BoardStorage;

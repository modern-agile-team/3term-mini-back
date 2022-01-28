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
  static async selectBoardToNonUser(boardNum) {
    try {
      const query = `
      SELECT boards.no, boards.user_no AS boardWriteUserNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS boardInDate, users.nickname
	    FROM boards
      LEFT JOIN users
      ON boards.user_no = users.no
    	WHERE boards.no = ?`;
      const selectResult = await mysql.query(query, [boardNum.boardNo]);

      if (selectResult[0].length) {
        return { success: true, data: selectResult[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        msg: "비회원 게시판 접속 기능 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }

  static async selectBoardCmt(boardNum) {
    try {
      const { boardNo } = boardNum;
      const query = `
      SELECT comments.no AS cmtId, comments.user_no AS commentUserNo, description, DATE_FORMAT(in_date,'%m/%d %H:%i') AS inDate, users.nickname
      FROM comments 
      LEFT JOIN users
      ON comments.user_no = users.no
      WHERE board_no = ?`;
      const selectResult = await mysql.query(query, [boardNo]);

      if (!selectResult[0].length) {
        return { success: false };
      } else {
        return { success: true, comments: selectResult[0] };
      }
    } catch (err) {
      throw {
        msg: "회원 게시판 댓글 조회 기능 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }

  static async selectBoardToUser(boardNum) {
    try {
      const { boardNo } = boardNum;
      const query = `
      SELECT users.no AS writerNo, boards.no AS boardNo, boards.user_no AS boardWriteUserNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS boardInDate, users.nickname
	    FROM boards
      LEFT JOIN users
      ON boards.user_no = users.no
    	WHERE boards.no = ?`;
      const selectResult = await mysql.query(query, [boardNo]);
      if (selectResult[0].length) {
        return { success: true, boardInfo: selectResult[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        err: "회원 게시판 접속 기능 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }

  static async createBoard(boardInfo) {
    try {
      const { user_no, title, description } = boardInfo;
      const query = `INSERT INTO boards(user_no, title, description) VALUES(?, ?, ?);`;
      const insertResult = await mysql.query(query, [
        user_no,
        title,
        description,
      ]);

      if (insertResult[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        err: "게시판 생성 기능 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }

  static async updateBoard(updateInfo) {
    try {
      const { boardNo, userNo, title, description } = updateInfo;
      const query = `UPDATE boards SET title = ?, description = ?  WHERE no = ? AND user_no = ?;`;
      const updateResult = await mysql.query(query, [
        title,
        description,
        boardNo,
        userNo,
      ]);

      if (updateResult[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        err: "게시글 수정 기능 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }

  static async selectBeforeBoard(boardAndUserNo) {
    try {
      const { boardNo, userNo } = boardAndUserNo;
      const query = `SELECT title, description FROM boards WHERE no = ? AND user_no = ?;`;
      const selectResult = await mysql.query(query, [boardNo, userNo]);

      if (selectResult[0].length) {
        return { success: true, boardInfo: selectResult[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        err: "게시글 수정화면 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }
}

module.exports = BoardStorage;

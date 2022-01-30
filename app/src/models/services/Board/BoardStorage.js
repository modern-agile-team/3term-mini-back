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
  static async selectToNonUser(boardNum) {
    try {
      const query = `
      SELECT (SELECT count(*) from comments left join boards on boards.no = comments.board_no where boards.no = ?) as commentCount, boards.no, boards.user_no AS boardWriteUserNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS boardInDate, users.nickname
	    FROM boards
      LEFT JOIN users
      ON boards.user_no = users.no
    	WHERE boards.no = ?`;
      const selectResult = await mysql.query(query, [
        boardNum.boardNo,
        boardNum.boardNo,
      ]);

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

  static async selectCmt(boardNum) {
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

  static async selectToUser(boardNum) {
    try {
      const { boardNo } = boardNum;
      const query = `
      SELECT (SELECT count(*) from comments left join boards on boards.no = comments.board_no where boards.no = ?) as commentCount, users.no AS writerNo, hit, boards.no AS boardNo, boards.user_no AS boardWriteUserNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS boardInDate, users.nickname
	    FROM boards
      LEFT JOIN users
      ON boards.user_no = users.no
    	WHERE boards.no = ?`;
      const selectResult = await mysql.query(query, [boardNo, boardNo]);
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

  static async create(boardInfo) {
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

  static async update(updateInfo) {
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

  static async selectBeforeView(boardNoAndUserNo) {
    try {
      const { boardNo, userNo } = boardNoAndUserNo;
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

  static async updateHit(connectionInfo) {
    try {
      const { boardNo, userNo } = connectionInfo;
      const query = `UPDATE boards SET hit = IFNULL(hit, 0) + 1 WHERE no=? AND (SELECT no FROM users WHERE no=?);`;
      const updateResult = await mysql.query(query, [boardNo, userNo]);

      if (updateResult[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        err: "게시글 조회수 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }
}

module.exports = BoardStorage;

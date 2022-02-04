"use strict";
const mysql = require("../../../config/mysql");

class BoardStorage {
  //2팀
  static async findAllByBoards() {
    try {
      const query = `
    select boards.no, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS inDate, DATE_FORMAT(boards.modify_date,'%m/%d %H:%i') AS modifyDate, (SELECT count(*) FROM comments where comments.board_no = boards.no) AS comments_length, boards.hit, users.nickname
    from boards
    left join users
    on boards.user_no = users.no;`;
      return await mysql.query(query);
    } catch (err) {
      throw {
        msg: "게시글 전체조회 오류입니다. 서버개발자에게 문의해주세요.",
      };
    }
  }

  static async findOneByBoardNo(order, keyword) {
    try {
      const query = `
      select boards.title, users.name,boards.in_date,boards.description
      from boards 
      left join users on boards.user_no = users.no 
      where ${order} Like "%${keyword}%";`;
      const searchedBoards = await mysql.query(query);
      return { success: true, data: searchedBoards[0] };
    } catch (err) {
      throw {
        success: false,
        msg: err,
      };
    }
  }

  static async deleteBoard(no) {
    try {
      const query = `
      DELETE 
      FROM boards 
      WHERE no=? ;`;
      const response = await mysql.query(query, [no]);
      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  //1팀------------------------------------------------------- 년월일 24시
  static async selectHotBoards() {
    try {
      const query = `
      SELECT no, title, DATE_FORMAT(in_date,'%y/%m/%d %H:%i') AS inDate
      FROM boards 
      ORDER BY (SELECT count(*) FROM comments WHERE comments.board_no = boards.no) DESC;
      `;
      const hotBoard = await mysql.query(query);

      return { success: true, hotBoard: hotBoard[0] };
    } catch (err) {
      throw { err: "인기 게시글 조회 에러입니다. 서버 개발자에게 문의하세요." };
    }
  }
  static async selectToNonUser(boardNum) {
    try {
      const query = `
      SELECT boards.no, boards.user_no AS boardWriteUserNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS boardInDate,(SELECT count(*) FROM comments where comments.board_no = boards.no) as comments_length, boards.hit, users.nickname
			FROM boards
		  LEFT JOIN users
		  ON boards.user_no = users.no
			WHERE boards.no = ?;`;
      const selectResult = await mysql.query(query, [boardNum.boardNo]);

      if (selectResult[0].length) {
        return { success: true, data: selectResult[0] };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw {
        msg: "비회원 게시글 접속 기능 에러입니다, 서버 개발자에게 문의해주세요.",
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
        msg: "회원 게시글 댓글 조회 기능 에러입니다, 서버 개발자에게 문의해주세요.",
      };
    }
  }

  static async selectToUser(boardNum) {
    try {
      const { boardNo } = boardNum;
      const query = `
      SELECT users.no AS writerNo, boards.no AS boardNo, boards.user_no AS boardWriteUserNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS boardInDate, (SELECT count(*) FROM comments where comments.board_no = boards.no) as comments_length, hit, users.nickname
	    FROM boards
      LEFT JOIN users
      ON boards.user_no = users.no
    	WHERE boards.no = ?;`;
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
        err: "게시글 생성 기능 에러입니다, 서버 개발자에게 문의해주세요.",
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

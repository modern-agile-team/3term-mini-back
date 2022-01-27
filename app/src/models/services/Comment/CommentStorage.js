"use strict";
const mysql = require("../../../config/mysql");

class CommentStorage {
  static async insertComment(cmtInfo) {
    try {
      const { userNo, boardNo, description } = cmtInfo;
      const query = `INSERT INTO comments(user_no, board_no, description) VALUES (?, ?, ?)`;
      const insertResult = await mysql.query(query, [
        userNo,
        boardNo,
        description,
      ]);

      if (insertResult[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { msg: "댓글 작성 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }

  static async modifyComment(cmtUserNo) {
    try {
      const { commentId, writeUserNo, boardNo, description } = cmtUserNo;
      const query = `UPDATE comments SET description=? WHERE no = ? AND user_no=? AND board_no=?`;
      const modifyResult = await mysql.query(query, [
        description,
        commentId,
        writeUserNo,
        boardNo,
      ]);

      if (modifyResult[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { msg: "댓글 작성 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }

  static async dropComment(cmtUserNo) {
    try {
      const { cmtNo } = cmtUserNo;
      const query = `DELETE FROM comments WHERE no=?`;
      const dropResult = await mysql.query(query, [cmtNo]);

      if (dropResult[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { msg: "댓글 삭제 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }
}

module.exports = CommentStorage;

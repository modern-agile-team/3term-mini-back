"use strict";
const mysql = require("../../../config/mysql");

class CommentStorage {
  static async inputComment(commentInfo) {
    try {
      const { userNo, boardNo, description } = commentInfo;
      const query = `INSERT INTO comments(user_no, board_no, description) VALUES (?, ?, ?)`;
      const commentData = await mysql.query(query, [
        userNo,
        boardNo,
        description,
      ]);

      if (commentData[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { msg: "댓글 작성 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }

  static async putComment(updateUserNo) {
    try {
      const { commentId, writeUserNo, boardNo, description } = updateUserNo;
      const query = `UPDATE comments SET description=? WHERE no = ? AND user_no=? AND board_no=?`;
      const updateData = await mysql.query(query, [
        description,
        commentId,
        writeUserNo,
        boardNo,
      ]);

      if (updateData[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { msg: "댓글 작성 에러입니다, 서버 개발자에게 문의해주세요." };
    }
  }
}

module.exports = CommentStorage;

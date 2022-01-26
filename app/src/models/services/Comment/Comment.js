"use strict";

const CommentStorage = require("./CommentStorage");

class Comment {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async insertComment() {
    try {
      const commentInfo = this.body;
      const comment = await CommentStorage.inputComment(commentInfo);

      if (comment.success) {
        return { success: true, msg: "댓글 작성이 완료되었습니다." };
      } else {
        return { success: false, msg: "댓글 작성을 실패했습니다." };
      }
    } catch (err) {
      throw { msg: "오류입니다." };
    }
  }

  async modifyComment() {
    try {
      const updateCommentInfo = this.body;
      const comment = await CommentStorage.putComment(updateCommentInfo);
      if (comment.success) {
        return { success: true, msg: "댓글 수정이 완료되었습니다." };
      } else {
        return { success: false, msg: "댓글 수정을 실패했습니다." };
      }
    } catch (err) {
      throw { msg: "오류입니다." };
    }
  }
}

module.exports = Comment;

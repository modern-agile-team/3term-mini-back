"use strict";

const CommentStorage = require("./CommentStorage");
const blank = require("../../utils/blankConfirm");

class Comment {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async commentToSave() {
    const cmtInfoToSave = this.body;
    const comment = await CommentStorage.insertComment(cmtInfoToSave);
    const commentBlank = blank.descConfirm(cmtInfoToSave.description);

    if (!commentBlank.success) {
      return { success: false, msg: commentBlank.msg };
    }

    try {
      if (comment.success) {
        return { success: true, msg: "댓글 작성이 완료되었습니다." };
      } else {
        return { success: false, msg: "댓글 작성을 실패했습니다." };
      }
    } catch (err) {
      throw { msg: "오류입니다." };
    }
  }

  async commentToChange() {
    try {
      const cmtInfoToChange = this.body;
      const comment = await CommentStorage.modifyComment(cmtInfoToChange);
      if (comment.success) {
        return { success: true, msg: "댓글 수정이 완료되었습니다." };
      } else {
        return { success: false, msg: "댓글 수정을 실패했습니다." };
      }
    } catch (err) {
      throw { msg: "오류입니다." };
    }
  }

  async commentToPop() {
    try {
      const cmtIntoToPop = this.params;
      const comment = await CommentStorage.dropComment(cmtIntoToPop);

      if (comment.success) {
        return { success: true, msg: "댓글 삭제가 완료되었습니다." };
      } else {
        return { success: false, msg: "댓글 삭제에 실패했습니다." };
      }
    } catch (err) {
      throw { msg: "오류입니다." };
    }
  }
}

module.exports = Comment;

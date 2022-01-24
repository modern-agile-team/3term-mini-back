"use strict";

const BoardStorage = require("./BoardStorage");

class Board {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async boardAll() {
    return await BoardStorage.findAllByBoards();
  }

  //1팀
  async boardCreate() {
    try {
      const boardWrite = this.body;
      if (
        boardWrite.title.length === 0 &&
        boardWrite.description.length === 0
      ) {
        return {
          success: false,
          msg: "제목 또는 내용을 입력해주세요",
        };
      }
      const response = await BoardStorage.createBoard(boardWrite);
      console.log(boardWrite);
      if (response.success) {
        return {
          success: true,
          msg: "게시물 등록이 완료되었습니다.",
        };
      } else {
        return { success: false, msg: "게시물 등록이 실패하였습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async boardUpdate() {
    const boardWrite = this.body;
    const userNo = this.params;
    const response = await BoardStorage.updateBoard(userNo, boardWrite);
    return response;
  }

  async boardByBeforUpdate() {
    const userNo = this.params;
    return await BoardStorage.findByThisBoardInfo(userNo);
  }
}

module.exports = Board;

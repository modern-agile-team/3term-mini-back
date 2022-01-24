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
    const boardWrite = this.body;
    const response = await BoardStorage.createBoard(boardWrite);
    return response;
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

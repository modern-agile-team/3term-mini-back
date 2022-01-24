"use strict";

const BoardStorage = require("./BoardStorage");

class Board {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }
  //2팀
  async boardAll() {
    return await BoardStorage.findAllByBoards();
  }
  async findOneByBoard(req) {
    const no = req.params.no;
    try {
      const response = await BoardStorage.findOneByBoardNo(no);
      return response[0][0];
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  async deleteBoard(req) {
    const no = req.params.no;
    try {
      const response = await BoardStorage.deleteBoard(no);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Board;

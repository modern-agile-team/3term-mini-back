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
}

module.exports = Board;

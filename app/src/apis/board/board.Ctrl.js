"use strict";

const Boards = require("../../models/services/Board/Board");

const process = {
  all: async (req, res) => {
    const board = new Boards(req);
    const boards = await board.boardAll(req);
    return res.json(boards[0]);
  },
};

module.exports = { process };

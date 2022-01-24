"use strict";

const Board = require("../../models/services/Board/Board");
const Boards = require("../../models/services/Board/Board");

const process = {
  //2팀
  all: async (req, res) => {
    const board = new Boards(req);
    const boards = await board.boardAll(req);
    return res.status(200).json(boards[0]);
  },
  findOneByBoard: async (req, res) => {
    const board = new Boards(req);
    const response = await board.findOneByBoard(req);
    return res.status(200).json(response);
  },
  delete: async (req, res) => {
    const board = new Board(req);
    const response = await board.deleteBoard(req);
    return res.status(204).json(response);
  },
};

module.exports = { process };

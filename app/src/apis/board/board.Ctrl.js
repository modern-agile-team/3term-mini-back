"use strict";

const Boards = require("../../models/services/Board/Board");

const process = {
  all: async (req, res) => {
    const board = new Boards(req);
    const boards = await board.boardAll(req);
    return res.json(boards[0]);
  },

  // 1팀
  create: async (req, res) => {
    const board = new Boards(req);
    const createBoard = await board.boardCreate(req);

    if (createBoard.success) {
      return res.status(201).json(createBoard);
    } else {
      return res.status(500).json(createBoard);
    }
  },

  update: async (req, res) => {
    const board = new Boards(req);
    const updateBoard = await board.boardUpdate(req);
    return res.json(updateBoard[0]);
  },

  findByBeforBoardInfo: async (req, res) => {
    const board = new Boards(req);
    const findByBeforBoardInfo = await board.boardByBeforUpdate(req);
    return res.json(findByBeforBoardInfo[0]);
  },
};

module.exports = { process };

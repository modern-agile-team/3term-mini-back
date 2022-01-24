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
    return res.json(createBoard[0]);
  },

  update: async (req, res) => {
    const board = new Boards(req);
    const updateBoard = await board.boardUpdate(req);
    return res.json(updateBoard[0]);
  },

  updateView: async (req, res) => {
    const board = new Boards(req);
    const updateViewBoard = await board.updateBoardView(req);
    return res.json(updateViewBoard[0]);
  },
};

module.exports = { process };

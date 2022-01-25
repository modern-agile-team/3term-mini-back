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
    if (updateBoard.success) {
      return res.status(200).json(updateBoard);
    } else {
      return res.status(500).json(updateBoard);
    }
  },

  findByBeforBoardInfo: async (req, res) => {
    const board = new Boards(req);
    const findByBeforBoardInfo = await board.boardByBeforUpdate(req);
    if (findByBeforBoardInfo.success) {
      return res.status(200).json(findByBeforBoardInfo);
    } else {
      return res.status(500).json(findByBeforBoardInfo);
    }
  },
};

module.exports = { process };

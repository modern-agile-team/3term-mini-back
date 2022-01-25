"use strict";

const Board = require("../../models/services/Board/Board");
const Boards = require("../../models/services/Board/Board");
const { connectBoard } = require("../../models/services/Board/BoardStorage");

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
  connect: async (req, res) => {
    const board = new Boards(req);

    try {
      const connectBoard = await board.boardConnect(req);

      if (connectBoard.success) {
        return res.status(201).json(connectBoard);
      } else {
        return res.status(404).json(connectBoard);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  userBoard: async (req, res) => {
    const board = new Boards(req);
    const userBoard = await board.userBoardConnect(req);
    return res.json(userBoard);
  },

  create: async (req, res) => {
    const board = new Boards(req);

    try {
      const createBoard = await board.boardCreate(req);

      if (createBoard.success) {
        return res.status(201).json(createBoard);
      } else {
        return res.status(400).json(createBoard);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  update: async (req, res) => {
    const board = new Boards(req);

    try {
      const updateBoard = await board.boardUpdate(req);
      if (updateBoard.success) {
        return res.status(200).json(updateBoard);
      } else {
        return res.status(400).json(updateBoard);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  findByBeforBoardInfo: async (req, res) => {
    const board = new Boards(req);

    try {
      const findByBeforBoardInfo = await board.boardByBeforUpdate(req);
      if (findByBeforBoardInfo.success) {
        return res.status(200).json(findByBeforBoardInfo);
      } else {
        return res.status(400).json(findByBeforBoardInfo);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },
};

module.exports = { process };

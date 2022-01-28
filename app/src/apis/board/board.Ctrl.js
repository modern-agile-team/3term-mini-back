"use strict";

const Board = require("../../models/services/Board/Board");
const Boards = require("../../models/services/Board/Board");
const logger = require("../../config/logger");
const { connectBoard } = require("../../models/services/Board/BoardStorage");

const process = {
  //2팀
  all: async (req, res) => {
    const board = new Boards(req);
    const boards = await board.boardAll(req);
    console.log(boards);
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
  readNonUserConnect: async (req, res) => {
    try {
      const board = new Boards(req);
      const response = await board.nonUserBoardConnect(req);

      if (response.success) {
        logger.info(`GET /connect 201 ${response.success} ${response.msg}`);
        return res.status(201).json(response);
      } else {
        logger.error(`GET /connect 404  ${response.success} ${response.msg}`);
        return res.status(404).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  readUserConnect: async (req, res) => {
    try {
      const board = new Boards(req);
      const response = await board.userBoardConnect(req);
      if (response.success) {
        logger.info(`GET /connect 201 ${response.success} ${response.msg}`);
        return res.status(200).json(response);
      } else {
        logger.error(`GET /connect 404  ${response.success} ${response.msg}`);
        return res.status(404).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  readBeforeBoard: async (req, res) => {
    try {
      const board = new Boards(req);
      const response = await board.boardByBeforeUpdate(req);

      if (response.success) {
        logger.info(`GET /connect 200 ${response.success} ${response.msg}`);
        return res.status(200).json(response);
      } else {
        logger.error(`GET /connect 400  ${response.success} ${response.msg}`);
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  createBoard: async (req, res) => {
    try {
      const board = new Boards(req);
      const response = await board.boardCreate(req);

      if (response.success) {
        logger.info(`POST /connect 201 ${response.success} ${response.msg}`);
        return res.status(201).json(response);
      } else {
        logger.error(`POST /connect 400  ${response.success} ${response.msg}`);
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  updateBoard: async (req, res) => {
    try {
      const board = new Boards(req);
      const response = await board.boardUpdate(req);

      if (response.success) {
        logger.info(`PUT /connect 200 ${response.success} ${response.msg}`);
        return res.status(200).json(response);
      } else {
        logger.error(`PUT /connect 400  ${response.success} ${response.msg}`);
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },
};

module.exports = { process };

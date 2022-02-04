"use strict";

const logger = require("../../config/logger");
const Board = require("../../models/services/Board/Board");
const Boards = require("../../models/services/Board/Board");
const { connectBoard } = require("../../models/services/Board/BoardStorage");

const process = {
  //2팀
  all: async (req, res) => {
    try {
      const board = new Boards(req);
      const boards = await board.boardAll(req);

      return res.status(200).json(boards[0]);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  findOneByBoard: async (req, res) => {
    const board = new Boards(req);
    const response = await board.findOneByBoard(req);
    if (!response.success) {
      logger.error(
        `SELECT /selectBoards 404  ${response.success} ${response.msg}`
      );
      return res.status(404).json(response);
    } else {
      logger.info(
        `SELECT /selectBoards 204  ${response.success} ${response.msg}`
      );
      return res.status(202).json(response.data);
    }
  },
  delete: async (req, res) => {
    const board = new Board(req);
    const response = await board.deleteBoard(req);
    if (!response.success) {
      logger.error(
        `DELETE /deleteBoard 401  ${response.success} ${response.err}`
      );
      return res.status(401).json(response);
    } else {
      logger.info(
        `DELETE /deleteBoard 204  ${response.success} ${response.msg}`
      );
      return res.status(204).json(response);
    }
  },

  // 1팀
  hotBoard: async (req, res) => {
    try {
      const board = new Boards(req);
      const response = await board.hotBoardAll(req);
      if (response.success) {
        logger.info(`GET /connect 200 ${response.success}`);
        return res.status(200).json(response);
      } else {
        logger.error(`GET /connect 400  ${response.success}`);
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  readNonUserConnect: async (req, res) => {
    try {
      const board = new Boards(req);
      const response = await board.nonUserConnect(req);

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
      const response = await board.userConnect(req);

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
      const response = await board.beforeUpdate(req);

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
      const response = await board.create(req);

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
      const response = await board.update(req);

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

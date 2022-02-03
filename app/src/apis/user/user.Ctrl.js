"use strict";

const logger = require("../../config/logger");
const User = require("../../models/services/User/User");

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (!response.success) {
      logger.error(`POST /login 401  ${response.success} ${response.err}`);
      return res.status(401).json(response);
    } else {
      logger.info(`POST /login 201 ${response.success} ${response.msg}`);
      return res.status(201).json(response);
    }
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    if (!response.success) {
      logger.error(`POST /register 401 ${response.success} ${response.err}`);
      return res.status(401).json(response);
    } else
      logger.info(`POST /register 201 ${response.success} ${response.msg}`);
    return res.status(201).json(response);
  },
  // checkBox: async (req, res) => {
  //   const user = User(req.body);
  //   const response = await user.checkBox();
  // },
};

module.exports = { process };

"use strict";

const logger = require("../../config/logger");
const User = require("../../models/services/User/User");

const process = {
  login: async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.login();
      if (!response.success) {
        logger.error(`POST /login 401  ${response.success} ${response.msg}`);
        return res.status(400).json(response);
      } else {
        logger.info(`POST /login 201 ${response.success} ${response.msg}`);
        return res.status(201).json(response);
      }
    } catch (err) {
      {
        console.log(err);
        return res.status(500).json(err);
      }
    }
  },
  register: async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.register();

      if (!response.success) {
        logger.error(`POST /register 401 ${response.success} ${response.msg}`);
        return res.status(401).json(response);
      } else
        logger.info(`POST /register 201 ${response.success} ${response.msg}`);
      return res.status(201).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = { process };

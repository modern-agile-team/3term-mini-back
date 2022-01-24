"use strict";

const Report = require("../../models/services/Report/Report");

const process = {
  boardReport: async (req, res) => {
    const report = new Report(req);
    const response = await report.reportBoard(req);

    if (response.success) {
      return res.status(201).json(response);
    } else {
      return res.status(500).json(response);
    }
  },

  userReport: async (req, res) => {
    const report = new Report(req);
    const response = await report.reportUser(req);

    if (response.success) {
      return res.status(201).json(response);
    } else {
      return res.status(500).json(response);
    }
  },
};

module.exports = {
  process,
};

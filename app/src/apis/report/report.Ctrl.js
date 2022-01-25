"use strict";

const Report = require("../../models/services/Report/Report");

const lookUp = {
  lookUpReportPage: async (req, res) => {
    const report = new Report(req);
    const response = await report.getReportCategory(req);

    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response);
    }
  },
};

const process = {
  boardReport: async (req, res) => {
    const report = new Report(req);
    const response = await report.reportBoard(req);

    try {
      if (response.success) {
        return res.status(201).json(response);
      } else {
        return res.status(404).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  userReport: async (req, res) => {
    const report = new Report(req);
    const response = await report.reportUser(req);

    try {
      if (response.success) {
        return res.status(201).json(response);
      } else {
        return res.status(404).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },
};

module.exports = {
  process,
  lookUp,
};

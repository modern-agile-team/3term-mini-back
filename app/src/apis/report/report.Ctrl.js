"use strict";

const Report = require("../../models/services/Report/Report");

const lookUp = {
  readReport: async (req, res) => {
    const report = new Report(req);
    const response = await report.reportCategoryToGet(req);

    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response);
    }
  },
};

const process = {
  createBoardReport: async (req, res) => {
    const report = new Report(req);
    const response = await report.boardReportToSave(req);

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

  createUserReport: async (req, res) => {
    const report = new Report(req);
    const response = await report.userReportToSave(req);

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

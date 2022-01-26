"use strict";

const Comment = require("../../models/services/Comment/Comment");

const process = {
  commentCreate: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.insertComment(req);

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

  commentUpdate: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.modifyComment(req);

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

  commentDelete: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.dropComment(req);

    try {
      if (response.success) {
        return res.status(200).json(response);
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
};

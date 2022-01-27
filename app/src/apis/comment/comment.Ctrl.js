"use strict";

const Comment = require("../../models/services/Comment/Comment");

const process = {
  createComment: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.commentToSave(req);

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

  updateComment: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.commentToChange(req);

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

  deleteComment: async (req, res) => {
    const comment = new Comment(req);
    const response = await comment.commentToPop(req);

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

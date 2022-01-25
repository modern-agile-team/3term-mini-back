"use strict";

const Profile = require("../../models/services/Profile/Profile");

const process = {
  searchProfile: async (req, res) => {
    const profile = new Profile(req.params.findByUserProfile);
    const response = await profile.getProfile();

    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response);
    }
  },
};

module.exports = {
  process,
};

"use strict";

const Profile = require("../../models/services/Profile/Profile");

const process = {
  searchProfile: async (req, res) => {
    const profile = new Profile();
    const response = await profile.searchProfile(req.params.findByUserProfile);

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

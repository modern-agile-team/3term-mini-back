"use strict";

const Profile = require("../../models/services/Profile/Profile");

const process = {
  readProfile: async (req, res) => {
    const profile = new Profile(req.params);
    console.log(req.params);
    const response = await profile.profileToGet(req.params);

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

"use strict";

const Profile = require("../../models/services/Profile/Profile");

const process = {
  searchProfile: async (req, res) => {
    const profile = new Profile();
    const response = await profile.searchProfile();

    return response;
  },
};

module.exports = {
  process,
};

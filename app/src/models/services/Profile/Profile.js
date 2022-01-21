"use strict";

const ProfileStorage = require("./ProfileStorage");

class profile {
  constructor(body) {
    this.body = body;
  }

  async searchProfile() {
    try {
      const infoProfile = await ProfileStorage.findProfile();

      return infoProfile;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = profile;

"use strict";

const ProfileStorage = require("./ProfileStorage");

class profile {
  constructor(req) {
    this.params = req;
    this.body = req;
  }

  async getProfile() {
    try {
      const userByProfile = this.params;
      const infoProfile = await ProfileStorage.findOneByProfile(userByProfile);

      if (infoProfile.success) {
        return {
          success: true,
          profile: infoProfile.infoProfile,
          msg: "프로필 불러오기에 성공했습니다.",
        };
      } else {
        return { success: false, msg: "해당 유저의 정보가 없습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = profile;

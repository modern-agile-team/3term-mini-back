"use strict";

const ProfileStorage = require("./ProfileStorage");

class profile {
  constructor(req) {
    this.params = req;
    this.body = req;
  }

  async searchProfile(userByProfile) {
    const reportCheckbox = {
      1: "욕설및비방",
      2: "개인정보요구",
      3: "사기",
      4: "사적인연락",
      5: "도배",
      6: "선정적인게시물",
      7: "폭력적위협",
    };
    try {
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

"use strict";

const UserStorage = require("./UserStorage");
class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    try {
      // const { id, password } = await UserStorage.getUserInfo(client.id);
      const userInfo = await UserStorage.getUserInfo(client.id);
      const trueUserInfo = userInfo.info;
      if (trueUserInfo) {
        if (trueUserInfo.password === client.password) {
          return { success: true, msg: "로그인 성공" };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다" };
      }

      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async agreement() {
    const agreement = this.body;
    const data = {
      id: agreement.id,
    };

    const keys = [
      "services",
      "userinfo",
      "rules",
      "promotion",
      "auth",
      "adult",
    ];

    keys.forEach((key, idx) => {
      data[key] = agreement[idx];
    });

    const dataBox = {
      id: data.id,
      essential: data.services,
      choice: data.promotion,
    };

    try {
      const checkBox = await UserStorage.getUserCheck(dataBox);
      console.log(checkBox);
      if (checkBox.success) {
        return { success: true, msg: checkBox.msg };
      } else {
        return { success: false, msg: checkBox.msg };
      }
    } catch (err) {
      throw { msg: err.msg };
    }
  }

  async register() {
    const client = this.body;
    //id,psword,이름,이 있는지 부터 확인
    const clientObj = {
      id: client.id,
      password: client.password,
      // name: client.name,
      // confirm: client.passwordConfirm,
    };

    // if(!(client.id && client.psword && client.name&&client.pswordconfirm)) {
    const nullKeys = Object.keys(clientObj)
      .filter((key) => {
        if (!clientObj[key]) return true;
        return false;
      })
      .join(",");

    if (nullKeys)
      return {
        success: false,
        msg: `${nullKeys}에 해당하는 값을 입력해주세요`,
      };
    //password === passwordconfirm확인하는 작업
    // if (!(client.password === client.passwordConfirm)) {
    //   return {
    //     success: false,
    //     msg: "비밀번호와 비밀번호 확인이 서로 다릅니다.",
    //   };
    // }
    //body에 nickname값이 없다면 id값을 nickname으로 지정해줌
    if (!client.nickname) {
      client.nickname = client.id;
    }

    //id,nickname,mail 중복 시 다른 id로 입력 할 수 있도록.
    try {
      const duplicatedId = await UserStorage.isDuplicatedId(client.id);
      const duplicateNickname = await UserStorage.judgeDuplicateNickname(
        client.nickname
      );
      const duplicateMail = await UserStorage.judgeDuplicateMail(client.mail);

      const duplicationObj = {
        id: duplicatedId,
        nickname: duplicateNickname.success,
        mail: duplicateMail.success,
      };
      //id,nickname,mail이 중복이 있는 녀석들은 DB에서 가져올때 null이 아님으로 null이 아닌 중복이 있는 놈들만 배열로 만들어 준것임
      const duplicateKeys = Object.keys(duplicationObj).filter((key) => {
        if (duplicationObj[key]) return true;
        return false;
      });
      return duplicateKeys.length
        ? { success: false, msg: `${duplicateKeys}는 중복된 값입니다` }
        : await UserStorage.save(client);
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = User;

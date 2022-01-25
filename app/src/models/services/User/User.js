"use strict";

const UserStorage = require("./UserStorage");
class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    try {
      const { id, psword } = await UserStorage.getUserInfo(client.id);

      if (id) {
        if (id === client.id && psword === client.psword) {
          return { success: true };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다" };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  async register() {
    const client = this.body;
    //id,psword,이름,이 있는지 부터 확인
    const clientObj = {
      id: client.id,
      psword: client.psword,
      name: client.name,
      confirm: client.pswordConfirm,
    };
    // if(!(client.id && client.psword && client.name&&client.pswordconfirm)) {
    const nullkeys = Object.keys(clientObj)
      .filter((key) => {
        if (!clientObj[key]) return true;
        return false;
      })
      .join("");

    if (nullkeys)
      return {
        success: false,
        msg: `${nullkeys}에 해당하는 값을 입력해주세요`,
      };

    //body에 nickname값이 없다면 id값을 nickname으로 지정해줌
    if (!client.nickname) {
      client.nickname = client.id;
    }
    //id,mail 중복 시 다른 id,mail로 입력 할 수 있도록.
    try {
      const id = await UserStorage.getUserInfo(client.id);

      return id.length
        ? { success: false, msg: "해당 id는 사용중인 id입니다." }
        : await UserStorage.save(client);
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;

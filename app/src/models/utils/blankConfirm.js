"use strict";

class Blank {
  static boardConfirm(title, desc) {
    if (!title.replace(/^\s+|\s+$/gm, "").length) {
      return { success: false, msg: "제목을 입력해 주세요." };
    } else if (!desc.replace(/^\s+|\s+$/gm, "").length) {
      return { success: false, msg: "내용을 입력해 주세요." };
    } else {
      return { success: true };
    }
  }

  static descConfirm(desc) {
    if (!desc.replace(/^\s+|\s+$/gm, "").length) {
      return { success: false, msg: "내용을 입력해 주세요." };
    } else {
      return { success: true };
    }
  }

  static reportConfirm(id, desc) {
    if (!id.length) {
      return { success: false, msg: "체크박스를 선택해 주세요." };
    } else if (!desc.replace(/^\s+|\s+$/gm, "").length) {
      return { success: false, msg: "내용을 입력해 주세요." };
    } else {
      return { success: true };
    }
  }
}

module.exports = Blank;

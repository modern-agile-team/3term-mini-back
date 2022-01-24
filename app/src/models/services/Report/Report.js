"use strict";

const ReportStorage = require("./ReportStorage");

class report {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async reportBoard() {
    try {
      const reportDetail = this.body;
      const reportBoardResult = await ReportStorage.addBoardReport(
        reportDetail
      );

      if (reportBoardResult.success) {
        return {
          success: true,
          msg: "게시글 신고가 접수되었습니다..",
        };
      } else {
        return { success: false, msg: "게시글 신고 접수에 실패했습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  async reportUser() {
    try {
      const reportDetail = this.body;
      const reportUserResult = await ReportStorage.addUserReport(reportDetail);

      if (reportUserResult.success) {
        return {
          success: true,
          msg: "이용자 신고가 접수되었습니다.",
        };
      } else {
        return { success: false, msg: "이용자 신고 접수에 실패했습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = report;

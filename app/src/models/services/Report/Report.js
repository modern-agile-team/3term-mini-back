"use strict";

const ReportStorage = require("./ReportStorage");

class report {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }
  async getReportCategory() {
    try {
      const reportCategory = await ReportStorage.findReportCategory();

      if (reportCategory.success) {
        return { success: true, category: reportCategory.category };
      } else {
        return { success: false, msg: "카테고리 정보 조회에 실패했습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async reportBoard() {
    const reportDetail = this.body;
    const reportError = {
      desc: reportDetail.description,
      reportId: reportDetail.reportId,
    };
    console.log(reportError.desc.length, reportError.reportId.length);
    // 게시글 신고창에서 체크박스 또는 신고 사유를 입력하지 않을 경우 발생하는 에러
    if (!reportError.desc.length || reportError.reportId.length) {
      const nullKeys = Object.keys(reportError)
        .map((key) => {
          if (!reportError[key.length]) return key;
        })
        .join(" ");
      return {
        success: false,
        msg: `${nullKeys}에 해당하는 값을 입력해 주세요.`,
      };
    }

    try {
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
    const reportDetail = this.body;
    const reportError = {
      desc: reportDetail.description,
      reportId: reportDetail.reportId,
    };

    // 유저 신고창에서 체크박스 또는 신고 사유를 입력하지 않을 경우 발생하는 에러
    if (!reportError.desc || reportError.reportId) {
      const nullKeys = Object.keys(reportError)
        .map((key) => {
          if (!reportError[key].length) return key;
        })
        .join(" ");
      return {
        success: false,
        msg: `${nullKeys}에 해당하는 값을 입력해 주세요.`,
      };
    }

    try {
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

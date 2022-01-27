"use strict";

const ReportStorage = require("./ReportStorage");

class report {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }
  async reportCategoryToGet() {
    try {
      const reportCategory = await ReportStorage.selectReportCategory();

      if (reportCategory.success) {
        return { success: true, category: reportCategory.category };
      } else {
        return { success: false, msg: "카테고리 정보 조회에 실패했습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async boardReportToSave() {
    const reportDetail = this.body;
    const reportBlackConfirm = {
      desc: reportDetail.description,
      reportId: reportDetail.reportId,
    };

    // 게시글 신고창에서 체크박스 또는 신고 사유를 입력하지 않을 경우 발생하는 에러
    if (!reportBlackConfirm.desc.length || reportBlackConfirm.reportId.length) {
      const nullKeys = Object.keys(reportBlackConfirm)
        .map((key) => {
          if (!reportBlackConfirm[key.length]) return key;
        })
        .join(" ");
      return {
        success: false,
        msg: `${nullKeys}에 해당하는 값을 입력해 주세요.`,
      };
    }

    try {
      const reportBoard = await ReportStorage.insertBoardReport(reportDetail);

      if (reportBoard.success) {
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
  async userReportToSave() {
    const reportDetail = this.body;
    const reportBlackConfirm = {
      desc: reportDetail.description,
      reportId: reportDetail.reportId,
    };

    // 유저 신고창에서 체크박스 또는 신고 사유를 입력하지 않을 경우 발생하는 에러
    if (!reportBlackConfirm.desc || reportBlackConfirm.reportId) {
      const nullKeys = Object.keys(reportBlackConfirm)
        .map((key) => {
          if (!reportBlackConfirm[key].length) return key;
        })
        .join(" ");
      return {
        success: false,
        msg: `${nullKeys}에 해당하는 값을 입력해 주세요.`,
      };
    }

    try {
      const reportUser = await ReportStorage.insertUserReport(reportDetail);

      if (reportUser.success) {
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

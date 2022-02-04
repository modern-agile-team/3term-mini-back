"use strict";

const ReportStorage = require("./ReportStorage");
const Blank = require("../../utils/blankConfirm");

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
    const reportBlank = Blank.reportConfirm(
      reportDetail.reportId,
      reportDetail.description
    );
    // 게시글 신고창에서 체크박스 또는 신고 사유를 입력하지 않을 경우 발생하는 에러
    if (!reportBlank.success) {
      return {
        success: false,
        msg: reportBlank.msg,
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
    const reportConfirm = Blank.descConfirm(reportDetail.description);
    // 유저 신고창에서 체크박스 또는 신고 사유를 입력하지 않을 경우 발생하는 에러
    if (!reportDetail.reportId.length || !reportConfirm.desc.length) {
      return {
        success: false,
        msg: `신고 내용 입력 또는 체크박스를 선택해 주세요.`,
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

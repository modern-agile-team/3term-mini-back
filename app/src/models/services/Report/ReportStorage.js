"use strict";

const { report } = require("../../../apis/profile");
const mysql = require("../../../config/mysql");

class ReportStorage {
  static async findReportCategory() {
    try {
      const query = `SELECT * FROM report_categories;`;
      const reportCategory = await mysql.query(query);

      if (reportCategory[0].length) {
        return { success: true, category: reportCategory.shift() };
      } else {
        return { success: false };
      }
    } catch (err) {
      return { err: err };
    }
  }
  static async insertBoardReport(reportBoard) {
    try {
      const { reportedBoardNo, reportUserNo, description, reportId } =
        reportBoard;
      const query = `INSERT INTO report_boards(reported_board_no, report_user_no, description, first_check, second_check, third_check) 
                    VALUES(?, ?, ?, ?, ?, ?);`;
      const reportSave = await mysql.query(query, [
        reportedBoardNo,
        reportUserNo,
        description,
        reportId[0],
        reportId[1],
        reportId[2],
      ]);

      if (reportSave[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { err: "게시글 신고 접수 오류입니다. 서버 개발자에게 문의하세요." };
    }
  }

  static async insertUserReport(reportUser) {
    try {
      const { reportedUserNo, reportUserNo, description, reportId } =
        reportUser;
      const query = `INSERT INTO report_users(reported_user_no, report_user_no, description, first_check, second_check, third_check) 
                    VALUES(?, ?, ?, ?, ?, ?);`;
      const reportSave = await mysql.query(query, [
        reportedUserNo,
        reportUserNo,
        description,
        reportId[0],
        reportId[1],
        reportId[2],
      ]);

      if (reportSave[0].affectedRows) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      throw { msg: "이용자 신고 접수 오류입니다. 서버 개발자에게 문의하세요." };
    }
  }
}

module.exports = ReportStorage;

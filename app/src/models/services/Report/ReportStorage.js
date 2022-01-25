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
  static async addBoardReport(reportBoard) {
    const { reportedBoardNo, reportUserNo, description, reportId } =
      reportBoard;

    try {
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
      throw { err: "Server Error", code: err.code };
    }
  }

  static async addUserReport(reportUser) {
    const { reportedUserNo, reportUserNo, description, reportId } = reportUser;

    try {
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
      throw { err: "Server Error", code: err.code };
    }
  }
}

module.exports = ReportStorage;

"use strict";

const { report } = require("../../../apis/profile");
const category = require("../report-category");
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
      const query = `INSERT INTO report_boards(reported_board_no, report_user_no, description, first_check, second_check, third_check) 
                    VALUES(?, ?, ?, ?, ?, ?);`;
      const reportSave = await mysql.query(query, [
        reportBoard.reportedBoardNo,
        reportBoard.reportUserNo,
        reportBoard.description,
        reportCheckbox[reportBoard.first],
        reportCheckbox[reportBoard.second],
        reportCheckbox[reportBoard.third],
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
    const reportCheckbox = category;
    console.log(
      reportUser[0].reportedUserNo,
      reportUser[0].reportUserNo,
      reportUser[0].description,
      reportUser[0].reportId[0],
      reportUser[0].reportId[1],
      reportUser[0].reportId[2]
    );
    try {
      const query = `INSERT INTO report_users(reported_user_no, report_user_no, description, first_check, second_check, third_check) 
                    VALUES(?, ?, ?, ?, ?, ?);`;
      const reportSave = await mysql.query(query, [
        reportUser[0].reportedUserNo,
        reportUser[0].reportUserNo,
        reportUser[0].description,
        reportUser[0].reportId[0],
        reportUser[0].reportId[1],
        reportUser[0].reportId[2],
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

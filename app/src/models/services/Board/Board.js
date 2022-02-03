"use strict";

const UserStorage = require("../User/UserStorage");
const BoardStorage = require("./BoardStorage");

class Board {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }
  //2팀
  async boardAll() {
    return await BoardStorage.findAllByBoards();
  }
  async findOneByBoard() {
    // const sort = this.query.sort;
    let order = this.query.order;
    const keyword = this.query.keyword;
    if (order === "작성자") {
      order = "users.name";
    } else if (order === "제목") {
      order = "boards.title";
    }
    // order === "작성자" ? (order = "users.name") : (order = "boards.title");
    try {
      return await BoardStorage.findOneByBoardNo(
        // sort,
        order,
        keyword
      );
    } catch (err) {
      // console.log(err);
      if (err.msg.errno === 1054) {
        return {
          success: false,
          msg: "정확한 주소를 입력해 주세요.",
        };
      }
      return { success: false, msg: err };
    }
  }
  async deleteBoard(req) {
    const no = req.params.no;
    try {
      const response = await BoardStorage.deleteBoard(no);
      if (response.affectedRows === 1) {
        return { success: true, msg: "게시글이 성공적으로 삭제되었습니다." };
      }
    } catch (err) {
      if (err.msg.errno === 1451) {
        return {
          success: false,
          msg: "신고당한 게시글은 삭제할 수가 없습니다.",
        };
      }
      return { success: false, msg: err };
    }
  }

  //1팀
  async boardConnect() {
    const boardNo = this.params;
    try {
      const board = await BoardStorage.connectBoard(boardNo);
      const comment = await BoardStorage.findCmtAllByBoardNo(boardNo);

      if (board.success && comment.success) {
        return {
          success: board.success,
          board: board.data[0],
          comment: comment.comment,
        };
      } else if (!comment.success) {
        return {
          success: board.success,
          board: board.data[0],
        };
      } else {
        return { success: board.success, msg: "값을 찾을 수 없습니다." };
      }
    } catch (err) {
      return { err };
    }
  }

  async userBoardConnect() {
    const boardInfo = this.params;
    try {
      const board = await BoardStorage.userConnectBoard(boardInfo);
      if (board.boardInfo[0].user_no === Number(boardInfo.userNo)) {
        return { success: true, data: board };
      } else {
        return {
          success: false,
          msg: "자신이 직접 작성한 게시물이 아니거나 로그인이 되어있지 않습니다.",
        };
      }
    } catch (err) {
      return { success: false, err };
    }
  }

  async boardCreate() {
    try {
      const boardWrite = this.body;
      if (
        boardWrite.title.length === 0 ||
        boardWrite.description.length === 0
      ) {
        return {
          success: false,
          msg: "제목 또는 내용을 입력해주세요",
        };
      }
      const response = await BoardStorage.createBoard(boardWrite);

      if (response.success) {
        return {
          success: true,
          msg: "게시물 등록이 완료되었습니다.",
        };
      } else {
        return { success: false, msg: "게시물 등록이 실패하였습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async boardUpdate() {
    try {
      const boardWrite = this.body;
      if (
        boardWrite.title.length === 0 ||
        boardWrite.description.length === 0
      ) {
        return {
          success: false,
          msg: "제목 또는 내용을 입력해주세요",
        };
      }
      const userNo = this.params;
      const response = await BoardStorage.updateBoard(userNo, boardWrite);
      if (response.success) {
        return { success: response.success, msg: "수정이 완료되었습니다." };
      } else {
        return { success: response.success, msg: "수정이 되지 않았습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async boardByBeforUpdate() {
    try {
      const userNo = this.params;
      const findBoard = await BoardStorage.findByThisBoardInfo(userNo);
      if (findBoard.success) {
        return {
          success: findBoard.success,
          boardInfo: findBoard.boardInfo[0],
        };
      } else {
        return { success: findBoard.success, msg: "값이 들어있지 않습니다" };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Board;

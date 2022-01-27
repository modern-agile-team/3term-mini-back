"use strict";

const BoardStorage = require("./BoardStorage");

class Board {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }
  //2팀
  async boardAll() {
    return await BoardStorage.findAllByBoards();
  }
  async findOneByBoard() {
    const boardNo = this.body;

    try {
      const response = await BoardStorage.findOneByBoardNo(no);

      return response[0][0];
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  async deleteBoard(req) {
    const no = req.params.no;
    try {
      const response = await BoardStorage.deleteBoard(no);

      return response;
    } catch (err) {
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
    const boardNo = this.params;
    try {
      const comment = await BoardStorage.findCmtAllByBoardNo(boardNo);
      const board = await BoardStorage.userConnectBoard(boardNo);
      console.log(board);
      if (board.boardInfo) {
        if (
          board.boardInfo[0].boardWriteUserNo === Number(boardNo.userNo) &&
          comment.success
        ) {
          return {
            success: true,
            boardData: board.boardInfo[0],
            comments: comment.comment,
            boardWriter: true,
          };
        } else if (
          board.boardInfo[0].boardWriteUserNo === Number(boardNo.userNo) &&
          !comment.success
        ) {
          return {
            success: true,
            boardData: board.boardInfo[0],
            boardWriter: true,
          };
        } else if (
          board.boardInfo[0].boardWriteUserNo !== Number(boardNo.userNo) &&
          comment.success
        ) {
          return {
            success: true,
            boardData: board.boardInfo[0],
            comments: comment.comment,
            boardWriter: false,
          };
        } else {
          return {
            success: true,
            boardData: board.boardInfo[0],
            boardWriter: false,
          };
        }
      } else {
        return { success: false, msg: "해당 게시글이 존재하지 않습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
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
        return {
          success: response.success,
          msg: "게시물을 작성한 유저가 아닙니다.",
        };
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

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
  async hotBoardAll() {
    try {
      return await BoardStorage.selectHotBoards();
    } catch (err) {
      throw { success: false, err: err.err };
    }
  }

  async nonUserConnect() {
    try {
      const boardNo = this.params;
      const board = await BoardStorage.selectToNonUser(boardNo);
      const comment = await BoardStorage.selectCmt(boardNo);

      if (board.success && comment.success) {
        return {
          success: true,
          board: board.data[0],
          comments: comment.comments,
          msg: "비회원: 게시글 접속 성공",
        };
      } else if (board.success && !comment.success) {
        return {
          success: true,
          board: board.data[0],
          msg: "비회원: 게시글 접속 성공(댓글 X)",
        };
      } else {
        return {
          success: false,
          msg: "비회원 : 해당 게시글이 존재하지 않습니다.",
        };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async userConnect() {
    const boardNo = this.params;

    try {
      const board = await BoardStorage.selectToUser(boardNo);
      const comment = await BoardStorage.selectCmt(boardNo);

      if (board.success) {
        // 게시판 접속 성공시 조회수 증가
        BoardStorage.updateHit(boardNo);

        if (
          board.boardInfo[0].boardWriteUserNo === Number(boardNo.userNo) &&
          comment.success
        ) {
          return {
            success: true,
            boardData: board.boardInfo[0],
            comments: comment.comments,
            boardWriter: true,
            msg: "회원 : 게시글 접속 성공",
          };
        } else if (
          board.boardInfo[0].boardWriteUserNo === Number(boardNo.userNo) &&
          !comment.success
        ) {
          return {
            success: true,
            boardData: board.boardInfo[0],
            boardWriter: true,
            msg: "회원 : 게시글 접속 성공(댓글 X)",
          };
        } else if (
          board.boardInfo[0].boardWriteUserNo !== Number(boardNo.userNo) &&
          comment.success
        ) {
          return {
            success: true,
            boardData: board.boardInfo[0],
            comments: comment.comments,
            boardWriter: false,
            msg: "회원 : 게시글 접속 성공(댓글 O, 작성자 X)",
          };
        } else {
          return {
            success: true,
            boardData: board.boardInfo[0],
            boardWriter: false,
            msg: "회원 : 게시글 접속 성공(댓글 X, 작성자 X)",
          };
        }
      } else {
        return {
          success: false,
          msg: "회원 : 해당 게시글이 존재하지 않습니다.",
        };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async create() {
    const boardWrite = this.body;

    if (
      !boardWrite.title.replace(/^\s+|\s+$/gm, "").length ||
      !boardWrite.description.replace(/^\s+|\s+$/gm, "").length
    ) {
      return {
        success: false,
        msg: "제목 또는 내용을 입력해주세요",
      };
    }

    try {
      const response = await BoardStorage.create(boardWrite);

      if (response.success) {
        return {
          success: true,
          msg: "게시글 등록 성공",
        };
      } else {
        return { success: false, msg: "게시글 등록 실패" };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async update() {
    const boardWrite = this.body;

    if (
      !boardWrite.title.replace(/^\s+|\s+$/gm, "").length ||
      !boardWrite.description.replace(/^\s+|\s+$/gm, "").length
    ) {
      return {
        success: false,
        msg: "제목 또는 내용을 입력해주세요.",
      };
    }

    try {
      const board = await BoardStorage.update(boardWrite);

      if (board.success) {
        return { success: true, msg: "게시글 수정 성공" };
      } else {
        return {
          success: false,
          msg: "게시글 수정 실패",
        };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async beforeUpdate() {
    try {
      const userNoOfBoard = this.params;
      const board = await BoardStorage.selectBeforeView(userNoOfBoard);

      if (board.success) {
        return {
          success: true,
          boardInfo: board.boardInfo[0],
          msg: "게시글 수정화면 접속 성공",
        };
      } else {
        return { success: false, msg: "해당 게시글이 존재하지 않습니다." };
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Board;

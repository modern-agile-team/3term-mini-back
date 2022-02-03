"use strict";

const express = require("express");
const boardCtrl = require("./board.Ctrl");

const router = express.Router();

//2팀
router.get("/", boardCtrl.process.all);
router.get(`/findOneByBoard`, boardCtrl.process.findOneByBoard);
router.delete(`/deleteBoard/:no`, boardCtrl.process.delete);

// 1팀

//비회원 게시판 접속
router.get("/connect/:boardNo", boardCtrl.process.connect);

//회원 게시판 접속
router.get("/connect/:boardNo/:userNo", boardCtrl.process.userBoard);

// 수정 전 화면
router.get(
  "/updatePage/:boardNo/:userNo",
  boardCtrl.process.findByBeforBoardInfo
);

// 생성
router.post("/boardCreate", boardCtrl.process.create);

// 수정
router.put("/boardUpdate/:boardNo/:userNo", boardCtrl.process.update);

module.exports = router;

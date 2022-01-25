"use strict";

const express = require("express");
const boardCtrl = require("./board.Ctrl");

const router = express.Router();

//2팀
router.get("/", boardCtrl.process.all);
router.get(`/findOneByBoard/:no`, boardCtrl.process.findOneByBoard);
router.delete(`/deleteBoard/:no`, boardCtrl.process.delete);

// 1팀

//게시판 접속
router.get("/connect/:boardNo", boardCtrl.process.connect);

// 수정 전 화면
router.get(
  "/updatePage/:boardNo/:userNo",
  boardCtrl.process.findByBeforBoardInfo
);

// 생성
router.post("/create", boardCtrl.process.create);

// 수정
router.put("/update/:boardNo/:userNo", boardCtrl.process.update);

module.exports = router;

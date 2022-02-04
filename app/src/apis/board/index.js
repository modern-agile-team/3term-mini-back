"use strict";

const express = require("express");
const boardCtrl = require("./board.Ctrl");

const router = express.Router();

//2팀
router.get("/", boardCtrl.process.all);
router.get(`/searchBoard`, boardCtrl.process.SearchBoard);

router.delete(`/deleteBoard/:no`, boardCtrl.process.delete);

// 1팀
// 인기 게시글 조회
router.get("/hotBoard", boardCtrl.process.hotBoard);

// 비회원 게시글 접속
router.get("/connect/:boardNo", boardCtrl.process.readNonUserConnect);

// 회원 게시글 접속
router.get("/connect/:boardNo/:userNo", boardCtrl.process.readUserConnect);

// 수정 전 화면
router.get("/updatePage/:boardNo/:userNo", boardCtrl.process.readBeforeBoard);

// 게시글 생성
router.post("/create", boardCtrl.process.createBoard);

// 게시글 수정
router.put("/update", boardCtrl.process.updateBoard);

module.exports = router;

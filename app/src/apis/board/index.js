"use strict";

const express = require("express");
const boardCtrl = require("./board.Ctrl");

const router = express.Router();

//2팀
router.get("/", boardCtrl.process.all);
router.get(`/findOneByBoard/:no`, boardCtrl.process.findOneByBoard);
router.delete(`/deleteBoard/:no`, boardCtrl.process.delete);

// 1팀
router.post("/create", boardCtrl.process.create);
router.get("/create/:boardNo/:userNo", boardCtrl.process.findByBeforBoardInfo);
router.put("/create/:boardNo/:userNo", boardCtrl.process.update);

module.exports = router;

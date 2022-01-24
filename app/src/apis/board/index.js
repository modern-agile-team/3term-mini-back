"use strict";

const express = require("express");
const boardCtrl = require("./board.Ctrl");

const router = express.Router();

router.get("/", boardCtrl.process.all);

// 1팀
router.post("/create", boardCtrl.process.create);
router.get("/create/:boardNo/:userNo", boardCtrl.process.updateView);

router.put("/create/:boardNo/:userNo", boardCtrl.process.update);
module.exports = router;

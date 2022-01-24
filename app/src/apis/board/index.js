"use strict";

const express = require("express");
const boardCtrl = require("./board.Ctrl");

const router = express.Router();

//2팀
router.get("/", boardCtrl.process.all);
router.get(`/selectDetail/:no`, boardCtrl.process.selectDetail);
router.delete(`/deleteTable/:no`, boardCtrl.process.delete);
module.exports = router;

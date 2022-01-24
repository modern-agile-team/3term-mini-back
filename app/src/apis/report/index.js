"use strict";

const express = require("express");
const reportCtrl = require("./report.Ctrl");

const router = express.Router();

router.post("/board", reportCtrl.process.boardReport);
router.post("/user", reportCtrl.process.userReport);

module.exports = router;

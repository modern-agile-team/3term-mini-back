"use strict";

const express = require("express");
const reportCtrl = require("./report.Ctrl");

const router = express.Router();

router.get("/", reportCtrl.lookUp.lookUpReportPage);

router.post("/board", reportCtrl.process.boardReport);
router.post("/user", reportCtrl.process.userReport);

module.exports = router;

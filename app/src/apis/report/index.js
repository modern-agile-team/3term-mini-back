"use strict";

const express = require("express");
const reportCtrl = require("./report.Ctrl");

const router = express.Router();

router.get("/", reportCtrl.lookUp.readReport);

router.post("/board", reportCtrl.process.createBoardReport);
router.post("/user", reportCtrl.process.createUserReport);

module.exports = router;

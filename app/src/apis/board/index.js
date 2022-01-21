"use strict";

const express = require("express");
const boardCtrl = require("./board.ctrl");

const router = express.Router();

router.get("/", boardCtrl.process.all);

module.exports = router;

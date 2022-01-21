"use strict";

const express = require("express");
const boardCtrl = require("./board.Ctrl");

const router = express.Router();

router.get("/", boardCtrl.process.all);

module.exports = router;

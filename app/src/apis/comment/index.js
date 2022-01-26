"use strict";

const express = require("express");
const commentCtrl = require("./comment.Ctrl");

const router = express.Router();

router.post("/create", commentCtrl.process.commentCreate);
router.put("/update", commentCtrl.process.commentUpdate);

module.exports = router;

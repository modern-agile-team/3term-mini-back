"use strict";

const express = require("express");
const commentCtrl = require("./comment.Ctrl");

const router = express.Router();

router.post("/create", commentCtrl.process.commentCreate);

router.put("/update", commentCtrl.process.commentUpdate);

router.delete("/delete/:cmtNo", commentCtrl.process.commentDelete);

module.exports = router;

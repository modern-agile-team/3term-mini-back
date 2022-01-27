"use strict";

const express = require("express");
const commentCtrl = require("./comment.Ctrl");

const router = express.Router();

// 댓글 작성
router.post("/", commentCtrl.process.createComment);

// 댓글 수정
router.put("/", commentCtrl.process.updateComment);

// 댓글 삭제
router.delete("/:cmtNo", commentCtrl.process.deleteComment);

module.exports = router;

"use strict";

const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 경로 지정
const profile = require("./src/apis/profile");
const board = require("./src/apis/board");
const user = require("./src/apis/user");
const report = require("./src/apis/report");
const comment = require("./src/apis/comment");

// API 연결
app.use("/profile", profile);
app.use("/board", board);
app.use("/user", user);
app.use("/report", report);
app.use("/comment", comment);

module.exports = app;

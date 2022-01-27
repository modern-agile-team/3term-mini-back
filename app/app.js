"use strict";

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const logger = require("./src/config/logger");
const accessLogStream = require("./src/config/log");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 경로 지정
const profile = require("./src/apis/profile");
const board = require("./src/apis/board");
const user = require("./src/apis/user");
const report = require("./src/apis/report");
const comment = require("./src/apis/comment");

app.use(morgan("tiny", { stream: logger.stream }));
// API 연결
app.use("/profile", profile);
app.use("/board", board);
app.use("/user", user);
app.use("/report", report);
app.use("/comment", comment);

module.exports = app;

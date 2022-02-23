"use strict";

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./src/config/logger");
const accessLogStream = require("./src/config/log");
const base64 = require("base-64");
//base-64라는 모듈 설치

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API 경로 지정
const profile = require("./src/apis/profile");
const board = require("./src/apis/board");
const user = require("./src/apis/user");
const report = require("./src/apis/report");
const comment = require("./src/apis/comment");

app.use(morgan("tiny", { stream: logger.stream }));
// API 연결
app.use("/moae/profile", profile);
app.use("/moae/board", board);
app.use("/moae/user", user);
app.use("/moae/report", report);
app.use("/moae/comment", comment);

module.exports = app;

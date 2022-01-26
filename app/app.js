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

app.use(morgan("tiny", { stream: logger.stream }));
// API 연결
app.use("/api/profile", profile);
app.use("/api/board", board);
app.use("/api/user", user);
app.use("/api/report", report);
// app.use(morgan("dev"));

module.exports = app;

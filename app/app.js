"use strict";

const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 경로 지정
const profile = require("./src/apis/profile");
const board = require("./src/models/services/Board/BoardCtrl");

// API 연결
app.use("/api/profile", profile);
app.use("/api/board", board);

module.exports = app;

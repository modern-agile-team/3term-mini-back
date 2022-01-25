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

// API 연결
app.use("/api/profile", profile);
app.use("/api/board", board);
app.use("/api/user", user);

module.exports = app;

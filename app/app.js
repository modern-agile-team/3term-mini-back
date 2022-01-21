"use strict";

const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 경로 지정
const profile = require("./src/apis/profile");

// API 연결
app.use("/api/profile", profile);

module.exports = app;

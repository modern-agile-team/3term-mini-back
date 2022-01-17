"use strict";

const express = require("express");
const app = express();

const router = require("./src/routes/index");

app.use("/", router);

module.exports = app;

"use strict";

const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./src/routes");

app.use("/", router);

module.exports = app;

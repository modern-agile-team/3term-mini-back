"use strict";

const express = require("express");
const Router = express.Router();
const ctrl = require("./ctrl");

Router.get("/", ctrl.process.all);

module.exports = Router;

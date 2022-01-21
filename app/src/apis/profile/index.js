"use strict";

const express = require("express");
const profileCtrl = require("./profile.ctrl");

const router = express.Router();

router.get("/", profileCtrl);

module.exports = router;

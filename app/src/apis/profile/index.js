"use strict";

const express = require("express");
const profileCtrl = require("./profile.Ctrl");

const router = express.Router();

router.get("/:userNo", profileCtrl.process.readProfile);

module.exports = router;

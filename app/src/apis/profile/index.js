"use strict";

const express = require("express");
const profileCtrl = require("./profile.Ctrl");

const router = express.Router();

router.get("/:findUserProfile", profileCtrl.process.searchProfile);

module.exports = router;

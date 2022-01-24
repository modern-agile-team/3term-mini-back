"use strict";

const express = require("express");
const profileCtrl = require("./profile.Ctrl");

const router = express.Router();

router.get("/:findByUserProfile", profileCtrl.process.searchProfile);

module.exports = router;

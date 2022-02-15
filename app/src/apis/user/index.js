"use strict";

const express = require("express");
const router = express.Router();
const userCtrl = require("./user.Ctrl");

router.post("/register", userCtrl.process.register);
router.post("/login", userCtrl.process.login);
router.post("/agreement", userCtrl.process.agreement);
module.exports = router;

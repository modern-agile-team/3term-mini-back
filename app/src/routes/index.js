"use strict";

const express = require("express");
const router = express.Router();

router.get("/post", (req, res) => {
  res.send("hi");
});

module.exports = router;

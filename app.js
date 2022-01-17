const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, (req, res) => {
  console.log("서버가동");
});

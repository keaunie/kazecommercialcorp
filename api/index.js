const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express running on Vercel!" });
});

module.exports = app;
module.exports.handler = serverless(app);

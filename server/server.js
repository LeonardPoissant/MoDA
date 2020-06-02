"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const request = require("request");

require("dotenv").config();

const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(require("./routes"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});

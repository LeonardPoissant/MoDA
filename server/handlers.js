"use strict";
const { MongoClient } = require("mongodb");
const assert = require("assert");
const _ = require("lodash");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const testMongoDB = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const test = req.body;

  console.log("IM here", uri);

  try {
    await client.connect();
    const db = client.db("MoDA");
    const r = await db.collection("testIt").insertOne(test);
    assert.equal(1, r.insertedCount);
    res.status(201).json({
      status: 201,
      _id: r.insertedId,
      test: test,
      message: "MongoDB is populated",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, message: err });
  }
};

const x = "sdfsfdsdf";

const testEndpoint = (req, res) => {
  const test = req.body;
  res
    .status(200)
    .send({ status: 200, test: test, message: "You did it big boy" });
};

module.exports = {
  testMongoDB,
  testEndpoint,
};

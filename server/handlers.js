"use strict";

const { MongoClient } = require("mongodb");

// this is used to connect an endpoint to MongoAtlas. The string contains a password so we have to put it in the .env file.
const uri = process.env.MONGO_URI;

const testMongoDB = async (req, res) => {
  const client = new MongoClient(
    "mongodb+srv://Leonard:lLeonard737%26@cluster0-xilxs.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  );
  const test = req.body;

  console.log("IM here");

  try {
    await client.connect();
    const db = client.db("MoDA");
    const r = await db.collection("testIt").insertOne({ test });
    assert.equal(1, r.insertedCount);
    res.status(201).json({
      status: 201,
      test: test,
      message: "MongoDB is populated",
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: err });
  }
};

const testEndpoint = (req, res) => {
  test = req.body;
  res
    .status(200)
    .send({ status: 200, test: test, message: "You did it big boy" });
};

module.exports = {
  testMongoDB,
  testEndpoint,
};

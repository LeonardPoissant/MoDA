const router = require("express").Router();

const { testEndpoint, testMongoDB } = require("./handlers");

router.post("/endpoint", testEndpoint);
router.post("/mongotest", testMongoDB);

module.exports = router;

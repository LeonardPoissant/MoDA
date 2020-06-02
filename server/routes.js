const router = require("express").Router();

const { testEndpoint } = require("./handlers");

router.post("/endpoint", testEndpoint);

module.exports = router;

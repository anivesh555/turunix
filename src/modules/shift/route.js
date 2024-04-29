const express = require("express");
const router = express.Router();

const controller = require('./controller')

router.post("/add",controller.createShift)
router.post("/assign",controller.assignShift)


module.exports = router
const express = require("express");
const router = express.Router();

const isAuth = require("../../middleware/auth");

const controller = require('./controller')

router.post("/",controller.add)
router.get("/:userId",controller.get)


module.exports = router
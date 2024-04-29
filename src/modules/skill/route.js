const express = require("express");
const router = express.Router();

const isAuth = require("../../middleware/auth");

const controller = require('./controller')

router.post("/",controller.add)
router.get("/",controller.fetchAll)
router.get('/skills/:id',controller.fetchOne)
router.patch('/skills/:id',controller.patchOne)
router.delete('/skills/:id',controller.deleteOne)






module.exports = router
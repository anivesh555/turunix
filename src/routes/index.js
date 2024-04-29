const express = require('express')

const router = express.Router()

const userRoutes = require("../modules/user/route")
const skillRoutes = require('../modules/skill/route')
const availabilityRoutes = require('../modules/availability/route')
const shiftRoutes = require('../modules/shift/route')

router.use('/user',userRoutes)
router.use('/skill',skillRoutes)
router.use('/avail',availabilityRoutes)
router.use('/shift',shiftRoutes)



module.exports = router
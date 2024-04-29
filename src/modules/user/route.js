const express = require("express");
const router = express.Router();

const isAuth = require("../../middleware/auth");

const {getAllUser,
    registerUser,
    loginUser,
    reGenerateAccessToken
    } = require("./controller");

router.get("/",isAuth,getAllUser)
router.post("/",registerUser)
router.post("/login",loginUser)
router.post("/renew",reGenerateAccessToken)





module.exports = router
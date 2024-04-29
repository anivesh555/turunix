
const jwt = require('jsonwebtoken')

const constant = require('../utilities/constant')
const { customResponse } = require('../utilities/customResponse')

const isAuth = async function(req, res, next){
    const accessToken = req?.headers?.authorization
    if (!accessToken){
        return res.status(constant.HTTP_401_CODE).send(customResponse({
            code:constant.HTTP_401_CODE,
            message:constant.ACCESS_TOKEN_MISSING
        }))

    }
    const token = accessToken.split(" ")[1]
    const jwtSecret = process.env.JWTSECRET
    jwt.verify(token, jwtSecret, (err, data)=>{
        if(err){
            if (err.name === 'TokenExpiredError') {
                return res.status(constant.HTTP_401_CODE).send(customResponse({
                    code: constant.HTTP_419_CODE,
                    message: constant.ACCESS_TOKEN_EXPIRED
                }));
            } else {
                return res.status(constant.HTTP_401_CODE).send(customResponse({
                    code: constant.HTTP_401_CODE,
                    message: constant.ACCESS_TOKEN_INVALID
                }));
            }

        }
        next()
    })
}

module.exports = isAuth
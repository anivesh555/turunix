
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true  // for ref -> will remove white spaces only
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    skills:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Skill'

    }],
    tokens:{
        accessToken:{type:String},
        accessTokenExpiry:{type:Date},
        refreshToken:{type:String},
        refreshTokenExpiry:{type:Date}
    }

})

userSchema.methods.generateAccessToken = async function(){
    const secret = process.env.JWTSECRET
    const expire_time = process.env.ACCESS_TOKEN_EXPIRY
    const accessToken = jwt.sign({_id: this._id.toString()}, secret, {expiresIn: expire_time}); // Expires in 24 hours
    const accessTokenExpiry = new Date(new Date().getTime() + Number(expire_time))
    this.tokens.accessToken = accessToken
    this.tokens.accessTokenExpiry = accessTokenExpiry
    await this.save()
    return {accessToken,accessTokenExpiry}
}
userSchema.methods.generateRefreshToken = async function(){

    const secret = process.env.JWTSECRET
    const expire_time = process.env.REFRESH_TOKEN_EXPIRY
    const refreshToken = jwt.sign({_id: this._id.toString()}, secret, {expiresIn: expire_time}); // Expires in 7 DAYS
    const refreshTokenExpiry = new Date(new Date().getTime() + Number(expire_time))
    this.tokens.refreshToken = refreshToken
    this.tokens.refreshTokenExpiry = refreshTokenExpiry
  
    await this.save()
    return {refreshToken, refreshTokenExpiry}
   
}

const User = mongoose.model("User", userSchema)
module.exports = User
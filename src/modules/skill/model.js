const mongoose = require('mongoose')


const skillSchema = mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        unique:true,
        required:true
    }
})

const Skill = mongoose.model('Skill', skillSchema)
module.exports = Skill
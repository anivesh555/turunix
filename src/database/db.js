
const mongoose=require('mongoose')

mongoose.set('strictQuery',true)
mongoose.connect(`${process.env.DB_URI}`)
const db=mongoose.connection
db.on('error',(error)=>{
    console.log(error)
})
db.once('open',()=>{
    console.log('connected to mongodb ! Enjoy')
})
module.exports=db

const express = require('express')
require('dotenv').config();
const cors = require('cors');

const routes = require('./src/routes/index')
const db = require("./src/database/db")
const constants = require("./src/utilities/constant")
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')


const port = process.env.PORT

const app = express()
const corsConfig = {
    // need to add cors config here 

}
app.use(express.json())
app.use(cors(corsConfig))
app.use("/api",routes)

app.get("/",(req,res)=>{
    res.sendStatus(constants.HTTP_200_CODE)
})
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port , ()=>{
    console.log(`App is listening in ${port}`)
})

module.exports = app
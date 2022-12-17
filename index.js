const express = require('express')
const cors = require('cors')

const app = express()
const https = require('https')
require('dotenv').config();

global.env  = process.env.NODE_ENV


app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

/**Routes  */
const productRouter = require('./router/product')
const logRouter = require('./router/logs')

app.use('/api/products/',productRouter)
app.use('/api/logs/',logRouter)

//
const startServer = async () =>{

    /** Node server  */
    let PORT = process.env.PORT
    if(env == 'LOCAL'){
        app.listen(PORT,async ()=>{
            console.log("Server is running on port ",PORT)
        })
    }

}


startServer()

module.exports = app;


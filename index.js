
//pass: 2B7mgsEDHWBQfW0h

const express = require('express')
const {dbConnection} = require('./database/config')
const cors = require('cors')
require('dotenv').config()

//Creating express server

const app = express()

//Database
dbConnection()

//CORS
app.use(cors())

//Public directory
app.use(express.static('public'))

//Read and parse body
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/wallets',require('./routes/wallet'))

//Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server run at port ${process.env.PORT}`)
})
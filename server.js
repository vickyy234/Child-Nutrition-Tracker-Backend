const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
require('dotenv').config()

app.listen(process.env.PORT || 5000 , () => {
    console.log("Server started")
})

mongoose.connect('mongodb://localhost:27017/child-nutrition-tracker')
    .then(() => {
        console.log('DB connected!')
    })
    .catch((err) => {
        console.log('DB not connected ', err)
    })
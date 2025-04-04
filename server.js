const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
require('dotenv').config()

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started")
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connected!')
    })
    .catch((err) => {
        console.log('DB not connected ', err)
    })

const userSchema = new mongoose.Schema({
    name: String,
    number: Number,
    password: String,
    createdAt: { type: Date, default: Date.now }
})

const userModel = mongoose.model("userdata" , userSchema)  

app.post('/', async (req, res) => {
    try {
        const { name, number, password } = req.body;
        const res = new userModel({ name, number, password })
        await res.save();
        res.status(201).json({Message : 'Account Created' , name , number , password})
    }
    catch (err) {
        res.status(500).json({Message : 'Account not created'})
    }
})
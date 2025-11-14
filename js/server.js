require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const members = require('./members')
const app = express()

mongoose.connect(process.env.MONGODB_URI);
app.use(express.json()) 
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')


const memberRouter = require('../routes/member')
app.use("/members", memberRouter)

const userRouter = require('../routes/users')
app.use("/users", userRouter)

app.listen(3000)

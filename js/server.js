const express = require('express')
const mongoose = require('mongoose')
const members = require('../js/members')
const app = express()

const MONGODB_URI = 'mongodb://localhost:27017/ges'
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('---');
        console.log('✅ MongoDB connected successfully to:', MONGODB_URI);
        console.log('---');

    } catch (error) {
        console.error('---');
        console.error('❌ MongoDB Connection Error: Could not connect to the database.');
        console.error('Make sure your local MongoDB server (mongod) is running.');
        console.error('Error details:', error.message);
        console.error('---');
    }
}

connectDB();

members.

const userRouter = require('../routes/users')
app.use("/users", userRouter)

app.listen(3000)

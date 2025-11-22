if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const cors = require('cors')  
const members = require('./members')
const initializePassport = require('../js/passport-config')
const app = express()
initializePassport(passport)

mongoose.connect(process.env.MONGODB_URI);

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    credentials: true
}))

app.use(express.json()) 
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        sameSite: 'lax' 
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')

const memberRouter = require('../routes/member')
app.use("/members", memberRouter)

const userRouter = require('../routes/users')
app.use("/users", userRouter)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
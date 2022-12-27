const express = require('express');
const userRouter = require('./routes/user.router')
require('dotenv').config()
const mongoose = require('mongoose')
const ErrorMiddleware = require('./middleware/error.middleware')

const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser('secret'))
app.use(userRouter)
app.use(ErrorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(process.env.PORT, () => {
            console.log("server started")
        });

    } catch (e) {
        console.log(e)
    }
}
start()

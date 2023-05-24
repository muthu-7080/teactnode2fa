const express = require('express')
const app = express();
const registerRouter = require('./register/router')
const DBconnection = require('./config/db')
const bodyparser = require("body-parser")
const cors = require('cors')


app.use(express.json());
app.use(bodyparser.json())
app.use(cors())

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use("/users", registerRouter)

app.listen('3000', (req, res, next) => {
    console.log("server is running on port 3000")
})
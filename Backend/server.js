const express = require('express')
const cors = require('cors')
const errorHandler = require("./Middlewares/errorHandler")

const {login, getUser, getUsers, createUser} = require('./Services/services')

const app = express()

app.use(express.json())
app.use(cors())
app.use(errorHandler)

const PORT = 5000

const db = require("./Models")

app.listen(PORT, ()=>{
    console.log("listening...");
})

db.sequelize.sync().then((back)=>{
    app.post('/login', login)

    app.post('/create-user', createUser)

    app.get("/users", getUsers)

    app.get("/users/:id", getUser)

    app.get("/track/:id", (req, res) => {
        console.log("opened mail....");
        //track if user with the id have opened the mail or not
    })
})
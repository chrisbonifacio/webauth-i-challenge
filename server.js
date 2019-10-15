const express = require("express")

const server = express()

const userRouter = require("./api/users/userRouter")

server.use(express.json())

server.use("/api/", userRouter)

module.exports = server

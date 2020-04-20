const express = require("express")
const server = express()
const session = require("express-session")

const userRouter = require("./api/auth/authRouter")

const sessionConfig = {
  name: "monkey", // sid
  secret: "keep it secret, keep it safe!", // encrypts and decrypts the cookie, can be an environment variable
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true // this cookie cannot be accessed by Javascript
  },
  resave: false, //
  saveUninitialized: false // GDPR Compliance - Laws against setting cookies automatically
}

server.use(express.json())
server.use(session(sessionConfig))

server.use("/api/", userRouter)

module.exports = server

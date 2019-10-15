const express = require("express")

const router = express.Router()

const Users = require("../users/userModel")

const bcrypt = require("bcrypt")

const { validateLogin } = require("../middleware/auth")

router.use(validateLogin)

// GET all users
router.get("/users", async (req, res) => {
  const users = await Users.find()
  res.status(200).json(users)
})

// GET user by ID
router.get("/users/:id", async (req, res) => {
  const id = req.params.id
  const [user] = await Users.find(id)
  res.status(200).json(user)
})

// POST to register new user
router.post("/register", async (req, res) => {
  let user = req.body
  let hash = bcrypt.hashSync(user.password, 8)

  user.password = hash

  try {
    const [newUser] = await Users.add(user)
    res.status(201).json(newUser)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Could not create user, username may already be taken" })
  }
})

// POST to login
router.post("/login", validateLogin, async (req, res) => {
  const { username } = req.body
  res.status(200).json({ message: `Welcome ${username}!` })
})

module.exports = router

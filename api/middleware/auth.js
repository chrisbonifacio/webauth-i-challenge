const Users = require("../users/userModel")

const bcrypt = require("bcrypt")

async function validateLogin(req, res, next) {
  const { username, password } = req.body

  const [user] = await Users.findUser(username)

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user
    next()
  } else {
    res.status(400).json({ message: "Invalid Credentials" })
  }
}

module.exports = { validateLogin }

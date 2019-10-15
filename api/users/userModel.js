const knex = require("knex")
const knexConfig = require("../../knexfile")
const db = knex(knexConfig.development)

module.exports = { find, findUser, add, update, remove }

function find(id) {
  if (id) {
    return db("users")
      .where({ id: id })
      .select("*")
  } else {
    return db("users")
  }
}

function findUser(username) {
  return db("users")
    .where({ username: username })
    .select("*")
}

function add(user) {
  return db("users")
    .insert(user)
    .then(() => {
      return findUser(user.username)
    })
}

function update(id, changes) {}

function remove(id) {
  db("users")
    .where({ id: id })
    .del()
}

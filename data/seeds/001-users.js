const bcrypt = require("bcrypt")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "user", password: bcrypt.hashSync("password", 8) },
        { username: "chris", password: bcrypt.hashSync("newyork", 8) },
        { username: "mary", password: bcrypt.hashSync("miami", 8) }
      ])
    })
}

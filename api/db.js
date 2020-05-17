const db = require("../database/dbConfig");

function get(col, value) {
    return db("users").where(col, value);
}

function insert(user) {
    return db("users").insert(user);
}

module.exports = { get, insert };

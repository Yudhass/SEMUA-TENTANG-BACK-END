const dbConfig = require("../config/database.js");
const mongoose = require("mongoose");

module.exports = {
    mongoose,
    url: dbConfig,
    mahasiswa: require('./mahasiswa.model.js')(mongoose)
}
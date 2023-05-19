const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.applications = require("../models/application.model.js")(mongoose);
db.user = require("../models/user.model.js")(mongoose);
db.role = require("../models/role.model.js")(mongoose);
db.ROLES = ["user", "admin"];

module.exports = db;
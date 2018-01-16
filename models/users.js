var mongoose = require("mongoose");

userSchema = mongoose.Schema({
    username: String,
    password: String,
});

var User = mongoose.model("User", userSchema, "users");

module.exports = User;
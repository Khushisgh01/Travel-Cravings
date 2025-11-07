const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // passportLocalMongoose will automatically add the username and (hashed)password field
});

// Attaches authentication-related methods to the user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
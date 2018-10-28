const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please supply an email address"
  },
  name: {
    type: String,
    trim: true,
    required: "Please supply a name"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.virtual("gravatar").get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

//passportLocalMongoose
// --> .register() (see userController.js)
// --> .createStategy() method (see passport.js)
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);

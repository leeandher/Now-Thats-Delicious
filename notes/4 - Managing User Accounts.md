# Learn Node

_A compliation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

## Creating the Schema

Just like any other set of data we have to save, we need to create a User Schema in order to receive data in a format we can use. The thing is, with handling users, you also have to handle their passports and that kind of sensitive data needs to be `hash`ed so that if our DB leaks, or we have any sort of breach, our users aren't compromised. Here's an example User Account Schema:

```js
...
const validator = require("validator"); //Backend validation
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
  }
});
//passportLocalMongoose
//Adds a bunch of custom methods to our User schema
//usernameField specifies which field on our schema to use for login
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

//Cleans up how the userSchema.emmail.validate error looks when conflicted with {unique: true}
userSchema.plugin(mongodbErrorHandler);
...
```

This schema seems pretty complicated, but seemingly empty at the same time. The reason for this is the lack of password or passphrase or any verification field for the user. Well, this is actually completely handled by the `passport-local-mongoose` plugin which itself modifies our dchema behind-the-scenes to add in the `hash` and `salt` field, so that we never have to deal with the user's passwords.

---

## Using Passport.js for Validation

---

## Using Passport.js for Authentication

Another note to keep in mind is that with the ability to sign-in, comes the need to view and change profile data, register, validate the register data, and that can get pretty hairy. This is especially true when you take into account the need to interface with the database when authenticating the user login, logout and password resets. Therefore, to keep things distinct we write two seperate controllers: `authController.js` for handling profile authentication, and `userController.js` for handling individual user actions.

<!-- //Logging in/out -->

---

## User Account Specifics

<!-- How to render the account info in the nav (locals)-->
<!-- Virtual fields -->
<!-- Editing the account data  -->
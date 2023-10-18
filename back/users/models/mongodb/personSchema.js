const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },

  roles: Array,
  contact: {
    phoneNumber: String,
    email: {
      type: String,
      required: true,
      match: RegExp(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      ),
      lowercase: true,
      trim: true,
      unique: true,
    },

    address: {
      city: String,
      street: String,
      streetNumber: String,
    },
  },
  password: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;

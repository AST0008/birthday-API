const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Person = mongoose.model("Person",personSchema);

module.exports = Person
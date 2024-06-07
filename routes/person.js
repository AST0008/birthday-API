const express = require("express");
const router = express.Router();
const Person = require("../models/data");

router.get("/", async (req, res) => {
  //  res.send("Hello World ");
  try {
    const Name = req.query.name;
    console.log("Searching for person with name:", Name);
    const person = await Person.findOne({ name: Name });
    if (person) {
      res.send({ name: person.name, birthdate: person.birthdate });
    } else {
      res.status(404).send("Person not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, date } = req.body;
    const person = new Person({ name, date });
    await person.save();
    res.status(201).send(person);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:name", async (req, res) => {
  try {
    const { date } = req.body;
    const person = await Person.findOneAndReplace(
      { name: req.params.name },
      { name: req.params.name, date: date },
      { new: true }
    );
    if (person) {
      res.send(person);
    } else {
      res.status(404).send("Person not Found");
    }
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const person = await Person.findOneAndDelete({ name: req.params.name });
    if (person) {
      res.send("Person Deleted");
    } else {
      res.status(404).send("Person not Found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

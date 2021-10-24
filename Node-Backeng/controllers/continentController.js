const express = require("express");
const Continent = require("../models/continent");

const router = express.Router();

router.get("/", async (req, res) => {
  const continents = await Continent.find();
  res.status(200).json({ data: continents });
});

router.get("/:id", async (req, res) => {
  const continent = await Continent.findById((id = req.params.id))
    .populate("countries")
    .populate("clubs");
  res.status(200).json({ data: continent });
});

router.post("/create", async (req, res) => {
  const { name, country } = req.body;
  const continent = Continent({ name });
  if (country) {
    country.map((countrie) => {
      continent.countries.push(countrie);
    });
  }

  await continent.save();

  res
    .status(200)
    .json({ message: "Continent created successfully", data: continent });
});

module.exports = router;

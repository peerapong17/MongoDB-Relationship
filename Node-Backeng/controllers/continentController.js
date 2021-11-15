const express = require("express");
const Continent = require("../models/continent");
const Country = require("../models/country");
const Club = require("../models/club");

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

router.put("/update/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const continent = await Continent.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    await continent.save();

    res
      .status(200)
      .json({ message: "Continent updated successfully", data: continent });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const continent = await Continent.findByIdAndDelete(id);

    if (continent.countries.length > 0) {
      continent.countries.map(async (country) => {
        await Country.findByIdAndDelete(country);
      });
    }

    if (continent.clubs.length > 0) {
      continent.clubs.map(async (country) => {
        await Club.findByIdAndDelete(country);
      });
    }

    res.status(200).json({ message: "Continent delete successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

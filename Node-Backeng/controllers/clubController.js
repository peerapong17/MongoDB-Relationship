const express = require("express");
const Club = require("../models/club");
const Continent = require("../models/continent");
const Country = require("../models/country");

const router = express.Router();

router.get("/", async (req, res) => {
  const clubs = await Club.find();
  res.status(200).json({ data: clubs });
});

router.get("/:id", async (req, res) => {
  const club = await Club.findById(req.params.id).populate("players");
  res.status(200).json({ data: club });
});

router.post("/create", async (req, res) => {
  const club = new Club(req.body);

  if (req.body.continent) {
    const continent = await Continent.findById(req.body.continent);
    continent.clubs.push(club._id);
    await continent.save();
  }

  if (req.body.country) {
    const country = await Country.findById(req.body.country);
    country.clubs.push(club._id);
    await country.save();
  }

  await club.save();
  res.status(200).json({ message: "club created successfully", data: club });
});

module.exports = router;

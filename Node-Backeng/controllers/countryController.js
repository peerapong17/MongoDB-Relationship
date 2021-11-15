const express = require("express");
const Country = require("../models/country");
const Continent = require("../models/continent");
const Club = require("../models/club");
const Player = require("../models/player");

const router = express.Router();

router.get("/", async (req, res) => {
  const countries = await Country.find().populate("clubs");
  res.status(200).json({ data: countries });
});

router.get("/:id", async (req, res) => {
  const country = await Country.findById(req.params.id)
    .populate("continent")
    .populate("clubs")
    .populate("players");
  res.status(200).json({ data: country });
});

router.post("/create", async (req, res) => {
  const country = new Country(req.body);

  if (req.body.continent) {
    const continent = await Continent.findById(req.body.continent);
    continent.countries.push(country._id);
    await continent.save();
  }

  await country.save();

  res
    .status(200)
    .json({ message: "country created successfully", data: country });
});

router.put("/update/:id", async (req, res) => {
  const { name, continent } = req.body;
  const { id } = req.params;
  try {
    const country = await Country.findById(id);

    if (!country.continent.equals(continent)) {
      var oldContinent = await Continent.findById(country.continent);
      oldContinent.countries = oldContinent.countries.filter((oldCountry) => {
        // console.log(foundCountry.toString() != country._id.toString());
        console.log(country._id.equals(oldCountry));
        return !country._id.equals(oldCountry);
      });

      await oldContinent.save();

      const newContinent = await Continent.findById(continent);

      newContinent.countries.push(country._id);

      await newContinent.save();
    }

    country.name = name;
    country.continent = continent;

    await country.save();

    res
      .status(200)
      .json({ message: "Continent updated successfully", data: country });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Country.findByIdAndDelete(id);

    const oldContinent = await Continent.findById(country.continent);

    oldContinent.countries = oldContinent.countries.filter((oldCountry) => {
      return !oldCountry.equals(country._id);
    });

    await oldContinent.save();

    if (country.clubs.length > 0) {
      country.clubs.map(async (club) => {
        await Club.findByIdAndDelete(club);
      });
    }

    if (country.players.length > 0) {
      country.players.map(async (player) => {
        await Player.findByIdAndDelete(player);
      });
    }

    res.status(200).json({ message: "Country delete successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

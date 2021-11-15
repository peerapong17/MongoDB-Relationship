const express = require("express");
const Club = require("../models/club");
const Continent = require("../models/continent");
const Country = require("../models/country");
const Player = require("../models/player");

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

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, continent, country } = req.body;
  console.log(req.body);
  try {
    const club = await Club.findById(id);

    if (!club.continent.equals(continent)) {
      const oldContinent = await Continent.findById(club.continent);
      oldContinent.clubs = oldContinent.clubs.filter(
        (oldClub) => !club._id.equals(oldClub)
      );

      await oldContinent.save();

      const newContinent = await Continent.findById(continent);

      newContinent.clubs.push(club._id);

      await newContinent.save();
    }

    if (!club.country.equals(country)) {
      const oldCountry = await Country.findById(club.country);
      oldCountry.clubs = oldCountry.clubs.filter(
        (oldClub) => !club._id.equals(oldClub)
      );

      await oldCountry.save();

      const newCountry = await Country.findById(country);

      newCountry.clubs.push(club._id);

      await newCountry.save();
    }

    club.name = name;
    club.continent = continent;
    club.country = country;

    await club.save();

    res.status(200).json({ message: "Club updated successfully", data: club });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const club = await Club.findByIdAndDelete(id);

    const oldContinent = await Continent.findById(club.continent);

    oldContinent.clubs = oldContinent.clubs.filter((oldClub) => {
      return !oldClub.equals(club._id);
    });

    await oldContinent.save();

    const oldCountry = await Country.findById(club.country);

    oldCountry.clubs = oldCountry.clubs.filter((oldClub) => {
      return !oldClub.equals(club._id);
    });

    await oldCountry.save();

    if (club.players.length > 0) {
      club.players.map(async (player) => {
        await Player.findByIdAndDelete(player);
      });
    }

    res.status(200).json({ message: "Club delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;

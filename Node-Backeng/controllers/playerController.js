const express = require("express");
const Player = require("../models/player");
const Club = require("../models/club");
const Country = require("../models/country");
const Position = require("../models/position");

const router = express.Router();

router.get("/", async (req, res) => {
  const players = await Player.find();
  res.status(200).json({ data: players });
});

router.get("/:id", async (req, res) => {
  const player = await Player.findById(req.params.id)
    .populate("country")
    .populate("club")
    .populate("positions");
  res.status(200).json({ data: player });
});

router.post("/create", async (req, res) => {
  const player = new Player(req.body);

  if (req.body.country) {
    const country = await Country.findById(req.body.country);
    country.players.push(player._id);
    await country.save();
  }

  if (req.body.club) {
    const club = await Club.findById(req.body.club);
    club.players.push(player._id);
    await club.save();
  }

  if (req.body.positions) {
    req.body.positions.map(async (position_id) => {
      const position = await Position.findById(position_id);
      position.players.push(player._id);
      await position.save();
    });
  }

  await player.save();

  res
    .status(200)
    .json({ message: "player created successfully", data: player });
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, country, club, positions: selectedPositions } = req.body;

  console.log(selectedPositions);
  try {
    const player = await Player.findById(id);

    console.log(player)


    if (!player.country.equals(country)) {
      const oldCountry = await Country.findById(player.country);
      oldCountry.players = oldCountry.players.filter(
        (oldPlayer) => !player._id.equals(oldPlayer)
      );

      await oldCountry.save();

      const newCountry = await Country.findById(country);

      newCountry.players.push(player._id);

      await newCountry.save();
    }

    if (!player.club.equals(club)) {
      const oldClub = await Club.findById(player.club);
      oldClub.players = oldClub.players.filter(
        (oldPlayer) => !player._id.equals(oldPlayer)
      );

      await oldClub.save();

      const newClub = await Club.findById(club);

      newClub.players.push(player._id);

      await newClub.save();
    }

    if(selectedPositions.length > 0){
      player.positions = []
      selectedPositions.map(selectedPosition=>{
        player.positions.push(selectedPosition)
      })
    }

    console.log(player.positions)

    player.name = name;
    player.country = country;
    player.club = club;

    await player.save();

    res
      .status(200)
      .json({ message: "Player updated successfully", data: player });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findByIdAndDelete(id);

    const oldCountry = await Country.findById(player.country);

    oldCountry.players = oldCountry.players.filter((oldPlayer) => {
      return !oldPlayer.equals(player._id);
    });

    await oldCountry.save();

    const oldClub = await Club.findById(player.club);

    oldClub.players = oldClub.players.filter((oldPlayer) => {
      return !oldPlayer.equals(player._id);
    });

    await oldClub.save();

    res.status(200).json({ message: "Player delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;

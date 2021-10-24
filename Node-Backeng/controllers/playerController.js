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
    .populate("positions")
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

module.exports = router;

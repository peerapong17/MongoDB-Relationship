const express = require("express");
const Position = require("../models/position");

const router = express.Router();

router.get("/", async (req, res) => {
  const positions = await Position.find();
  res.status(200).json({ data: positions });
});

router.get("/:id", async (req, res) => {
  const position = await Position.findById(req.params.id).populate("players");
  res.status(200).json({ data: position });
});

module.exports = router;

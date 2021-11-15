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

router.post("/create", async (req, res) => {
  const { name } = req.body;

  const position = Position({ name });

  await position.save();

  res.status(200).json({ data: position });
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const position = await Position.findByIdAndUpdate(
    id,
    { name },
    {   
      new: true,
    }
  );

  await position.save();

  res
    .status(200)
    .json({ message: "Position updated successfully", data: position });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Position.findByIdAndDelete(id);

  res.status(200).json({ message: "Position delete successfully" });
});

module.exports = router;

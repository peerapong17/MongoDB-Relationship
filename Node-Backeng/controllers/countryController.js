const express = require("express");
const Country = require("../models/country");
const Continent = require("../models/continent");

const router = express.Router();

router.get("/", async (req, res) => {
    const countries = await Country.find().populate("clubs");
    res.status(200).json({ data: countries });
  });

router.get("/:id", async (req, res) => {
    const country = await Country.findById(req.params.id)
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

module.exports = router;

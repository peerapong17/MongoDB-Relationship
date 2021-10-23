const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Country = require("./models/country");
const Continent = require("./models/continent");
const Club = require("./models/Club");
const Player = require("./models/Player");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

mongoose.connect("mongodb://localhost:27017/MongoDB-Relationship").then(() => {
  app.listen(3000, (req, res) => {
    console.log("App is currently listening on port 3000");
  });
});

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

app.get("/continents", async (req, res) => {
  const continent = await Continent.find();
  res.status(200).json({ data: continent });
});

app.get("/continent/:id", async (req, res) => {
  const continent = await Continent.findById((id = req.params.id))
    .populate("countries")
    .populate("clubs");
  res.status(200).json({ data: continent });
});

app.post("/continent/create", async (req, res) => {
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

app.get("/countries", async (req, res) => {
  const country = await Country.find().populate("clubs");
  res.status(200).json({ data: country });
});

app.get("/country/:id", async (req, res) => {
  const country = await Country.findById(req.params.id)
    .populate("clubs")
    .populate("players");
  res.status(200).json({ data: country });
});

app.post("/country/create", async (req, res) => {
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

app.get("/clubs", async (req, res) => {
  const club = await Club.find();
  res.status(200).json({ data: club });
});

app.get("/club/:id", async (req, res) => {
  const club = await Club.findById(req.params.id).populate("players");
  res.status(200).json({ data: club });
});

app.post("/club/create", async (req, res) => {
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

app.get("/players", async (req, res) => {
  const player = await Player.find();
  res.status(200).json({ data: player });
});

app.get("/player/:id", async (req, res) => {
  const player = await Player.findById(req.params.id)
    .populate("country")
    .populate("club");
  res.status(200).json({ data: player });
});

app.post("/player/create", async (req, res) => {
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

  await player.save();

  res
    .status(200)
    .json({ message: "player created successfully", data: player });
});

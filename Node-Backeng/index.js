const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Country = require("./models/country");
const Continent = require("./models/continent");
const Club = require("./models/Club");

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
  const continent = await Continent.find().populate("countries");
  res.status(200).json({ data: continent });
});

app.get("/continent/:id", async (req, res) => {
  const continent = await Continent.findById(id=req.params.id).populate("countries");
  res.status(200).json({ data: continent });
});


app.post("/continent/create", async (req, res) => {
  const { name, country, club } = req.body;
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
  const country = await Country.find().populate("clubs")
  res.status(200).json({ data: country });
});

app.get("/country/:id", async (req, res) => {
  const country = await Country.findById(id=req.params.id).populate("clubs")
  res.status(200).json({ data: country });
});

app.post("/country/create", async (req, res) => {
  const country = Country(req.body);

  if (req.body.continent) {
    const continent = await Continent.findById((id = req.body.continent));
    continent.countries.push(country._id);
    await continent.save();
  }

  await country.save();
  res
    .status(200)
    .json({ message: "country created successfully", data: country });
});

app.get("/clubs", async (req, res) => {
  const club = await Club.find()
  res.status(200).json({ data: club });
});

app.get("/club/:id", async (req, res) => {
  const club = await Club.findById(id=req.params.id)
  res.status(200).json({ data: club });
});

app.post("/club/create", async (req, res) => {
  const club = Club(req.body);

  if (req.body.country) {
    const country = await Country.findById((id = req.body.country));
    country.clubs.push(club._id);
    await country.save();
  }

  await club.save();
  res
    .status(200)
    .json({ message: "club created successfully", data: club });
});

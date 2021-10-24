const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

app.use("/continents", require("./controllers/continentController"))

app.use("/countries", require("./controllers/countryController"))

app.use("/clubs", require("./controllers/clubController"))

app.use("/players", require("./controllers/playerController"))

app.use("/positions", require("./controllers/positionController"))



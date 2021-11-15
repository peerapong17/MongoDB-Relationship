const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Club = new Schema({
  name: String,
  continent: {
    type: Schema.Types.ObjectId,
    ref: "Continent",
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

module.exports = mongoose.model("Club", Club);

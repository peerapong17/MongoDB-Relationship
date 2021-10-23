const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Country = new Schema({
  name: String,
  continent: {
    type: Schema.Types.ObjectId,
    ref: "Continent",
  },
  clubs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
  ],
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

module.exports = mongoose.model("Country", Country);

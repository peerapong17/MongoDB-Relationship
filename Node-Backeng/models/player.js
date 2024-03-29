const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Player = new Schema({
  name: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
  positions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Position",
    },
  ],
});

module.exports = mongoose.model("Player", Player);

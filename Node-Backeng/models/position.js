const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Position = new Schema({
  name: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

module.exports = mongoose.model("Position", Position);

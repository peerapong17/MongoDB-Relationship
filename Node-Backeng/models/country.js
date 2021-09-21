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
});

module.exports = mongoose.model("Country", Country);

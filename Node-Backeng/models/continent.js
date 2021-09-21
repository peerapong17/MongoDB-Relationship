const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Continent = new Schema({
  name: String,
  countries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
});

module.exports = mongoose.model("Continent", Continent);

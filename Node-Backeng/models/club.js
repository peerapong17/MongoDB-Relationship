const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Club = new Schema({
  name: String,
  continent: {
    type: Schema.Types.ObjectId,
    ref: "Continent",
  },
  countries: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

module.exports = mongoose.model("Club", Club);

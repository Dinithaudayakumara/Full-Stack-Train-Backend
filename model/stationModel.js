const mongoose = require("mongoose");

const station = new mongoose.Schema({
  name: { type: String, required: true, }
});

const Station = mongoose.model("station", station);

module.exports = Station;

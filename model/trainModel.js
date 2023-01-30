const mongoose = require("mongoose");

const train = new mongoose.Schema({
  name: { type: String, required: true, }
});

const Train = mongoose.model("train", train);

module.exports = Train;

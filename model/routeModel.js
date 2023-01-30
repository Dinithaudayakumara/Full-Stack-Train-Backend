const mongoose = require("mongoose");

const route = new mongoose.Schema({
  name: { type: String, required: true, },
  trainId: { type: String, required: true, },
  fromLocation: { type: String, required: false, },
  toLocation: { type: String, required: false, },
  fromLocationId: { type: String, required: true, },
  toLocationId: { type: String, required: true, },
  time: { type: String, required: true, },
  fistCPrice: { type: String, required: true, },
  secoCPrice: { type: String, required: true, },
  thirdCPrice: { type: String, required: true, },
});

const Route = mongoose.model("route", route);

module.exports = Route;

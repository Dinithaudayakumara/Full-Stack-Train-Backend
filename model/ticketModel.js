const mongoose = require("mongoose");

const ticket = new mongoose.Schema({
  userId: { type: String, required: true, },
  fullName: { type: String, required: true, },
  ticketDate: { type: String, required: false, },
  fromL: { type: String, required: true, },
  toL: { type: String, required: true, },
  mobileNumber: { type: Number, required: false, },
  noOfSeat: { type: Number, required: false, },
  trainClass: { type: Number, required: false, },
  trainId: { type: String, required: true, },
  rootId: { type: String, required: true, },
  amount: { type: String, required: true, },
  payment: { type: Boolean, required: true, },
});

const Ticket = mongoose.model("ticket", ticket);
module.exports = Ticket;

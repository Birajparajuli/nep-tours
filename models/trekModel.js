const mongoose = require("mongoose");

const trekSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A trek must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A Trek Must have a name"],
  },
});

const Trek = mongoose.model("Trek", trekSchema);

module.exports = Trek;

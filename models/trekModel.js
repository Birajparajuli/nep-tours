const mongoose = require("mongoose");

const trekSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A trek must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A trek must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A trek must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A trek must have a difficulty level."],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A Trek Must have a name"],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A trek must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A trek must have a cover images"],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Trek = mongoose.model("Trek", trekSchema);

module.exports = Trek;

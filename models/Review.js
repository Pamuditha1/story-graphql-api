const mongoose = require("mongoose");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    score: {
      type: Number,
      required: true,
    },
    timeStamp: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  })
);

exports.Review = Review;

const mongoose = require("mongoose");

const Story = mongoose.model(
  "Story",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    details: {
      type: String,
    },
    location: {
      type: String,
    },
    timeStamp: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    visible: {
      type: Boolean,
      default: true,
    },
  })
);

exports.Story = Story;

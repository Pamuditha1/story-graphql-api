const { Review } = require("../../models/Review");

exports.Story = {
  reviews: async (parent, args) => {
    const reviews = await Review.find({ story: parent.id })
      .populate("user")
      .populate("story");
    return reviews;
  },
};

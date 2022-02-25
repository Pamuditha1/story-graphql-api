const { Story } = require("../../models/Story");
const { Review } = require("../../models/Review");

exports.User = {
  stories: async (parent, args) => {
    const { filter } = args;
    let stories;
    if (filter) {
      stories = await Story.find({
        user: parent.id,
        visible: filter.visible,
      }).populate("user");
    } else {
      stories = await Story.find({ user: parent.id }).populate("user");
    }
    return stories;
  },
  reviews: async (parent, args) => {
    const reviews = await Review.find({ user: parent.id })
      .populate("user")
      .populate("story");
    return reviews;
  },
};

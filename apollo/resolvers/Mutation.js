const { User } = require("../../models/User");
const { Story } = require("../../models/Story");
const { Review } = require("../../models/Review");

exports.Mutation = {
  addUser: async (parent, args) => {
    const { input } = args;
    const user = new User(input);
    const saved = await user.save();
    return saved;
  },
  addStory: async (parent, args) => {
    const { input } = args;
    const story = new Story(input);
    const saved = await story.save();
    return saved;
  },
  addReview: async (parent, args) => {
    const { input } = args;
    const review = new Review(input);
    const saved = await review.save();
    return saved;
  },
};

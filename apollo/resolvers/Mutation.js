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
  hideStory: async (parent, args) => {
    const { id } = args;
    const story = await Story.findById(id);
    story.visible = false;
    await story.save();
    return `Story ${story.title} Updated`;
  },
  deleteReview: async (parent, args) => {
    const { id } = args;
    const result = await Review.findByIdAndRemove(id);
    return `Review ${id} Removed`;
  },
};

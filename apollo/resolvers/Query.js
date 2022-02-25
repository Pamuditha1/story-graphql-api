const { User } = require("../../models/User");
const { Story } = require("../../models/Story");
const { Review } = require("../../models/Review");

exports.Query = {
  hello: () => {
    return "Hello World";
  },
  user: async (parent, args) => {
    const user = await User.findById(args.id);
    if (!user) return null;
    return user;
  },
  users: async (parent, args) => {
    const users = await User.find();
    return users;
  },
  story: async (parent, args) => {
    const story = await Story.findById(args.id).populate("user");
    return story;
  },
  stories: async (parent, args) => {
    const { filter } = args;
    let stories;
    if (filter) {
      stories = await Story.find({ visible: filter.visible }).populate("user");
    } else {
      stories = await Story.find().populate("user");
    }
    return stories;
  },
  review: async (parent, args) => {
    const review = await Review.findById(args.id)
      .populate("user")
      .populate("story");
    return review;
  },
  reviews: async (parent, args) => {
    const reviews = await Review.find().populate("user").populate("story");
    return reviews;
  },
};

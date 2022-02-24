const graphql = require("graphql");
const { Review } = require("../models/Review");
const { Story } = require("../models/Story");
const { User } = require("../models/User");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    age: { type: GraphQLInt },
    country: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    stories: {
      type: new GraphQLList(StoryType),
      async resolve(parent, args) {
        const stories = await Story.find({ user: parent.id }).populate("user");
        return stories;
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      async resolve(parent, args) {
        const reviews = await Review.find({ user: parent.id })
          .populate("user")
          .populate("story");
        return reviews;
      },
    },
  }),
});

const StoryType = new GraphQLObjectType({
  name: "Story",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    details: { type: GraphQLString },
    location: { type: GraphQLString },
    timeStamp: { type: GraphQLString },
    image: { type: GraphQLString },
    visible: { type: GraphQLBoolean },
    user: { type: UserType },
    reviews: {
      type: new GraphQLList(ReviewType),
      async resolve(parent, args) {
        const reviews = await Review.find({ story: parent.id })
          .populate("user")
          .populate("story");
        return reviews;
      },
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    score: { type: GraphQLInt },
    timeStamp: { type: GraphQLString },
    user: { type: UserType },
    story: { type: StoryType },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const user = await User.findById(args.id);
        return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        const users = await User.find();
        return users;
      },
    },
    story: {
      type: StoryType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const story = await Story.findById(args.id).populate("user");
        return story;
      },
    },
    stories: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        const stories = await Story.find().populate("user");
        return stories;
      },
    },
    review: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const review = await Review.findById(args.id)
          .populate("user")
          .populate("story");
        return review;
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      async resolve(parent, args) {
        const reviews = await Review.find().populate("user").populate("story");
        return reviews;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        country: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user = new User(args);
        const saved = await user.save();
        return saved;
      },
    },
    addStory: {
      type: StoryType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: GraphQLString },
        location: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const story = new Story(args);
        const saved = await story.save();
        return saved;
      },
    },
    addReview: {
      type: ReviewType,
      args: {
        score: { type: new GraphQLNonNull(GraphQLInt) },
        user: { type: new GraphQLNonNull(GraphQLID) },
        story: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const review = new Review(args);
        const saved = await review.save();
        return saved;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

const graphql = require("graphql");

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
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    score: { type: GraphQLInt },
    timeStamp: { type: GraphQLString },
    // user: { type: GraphQLString },
    // story: { type: GraphQLString }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return {
          id: args.id,
          username: "Pamuditha",
        };
      },
    },
    story: {
      type: StoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return {
          id: args.id,
          name: "Story",
        };
      },
    },
    review: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return {
          id: args.id,
          score: 5,
        };
      },
    },
  },
});

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addAuthor: {
//       type: AuthorType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLID) },
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: GraphQLInt },
//       },
//       resolve(parent, args) {
//         authors.push(args);
//         return authors[authors.length - 1];
//       },
//     },
//   },
// });
module.exports = new GraphQLSchema({
  query: RootQuery,
  // , mutation: Mutation
});

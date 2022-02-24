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
    stories: {
      type: new GraphQLList(StoryType),
      resolve(parent, args) {
        return [{ title: "Story 1" }, { title: "Story 2" }];
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return [{ score: 5 }, { score: 2 }];
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
    user: {
      type: UserType,
      resolve(parent, args) {
        console.log("parent", parent);
        return {
          username: "pamu",
        };
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return [{ score: 5 }, { score: 4 }];
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
    user: {
      type: UserType,
      resolve(parent, args) {
        return {
          username: "pamu",
        };
      },
    },
    story: {
      type: StoryType,
      resolve(parent, args) {
        return {
          title: "Story",
        };
      },
    },
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
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return [
          {
            id: 1,
            username: "Pamuditha",
          },
          {
            id: 2,
            username: "Pamu",
          },
        ];
      },
    },
    story: {
      type: StoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return {
          id: args.id,
          title: "Story",
        };
      },
    },
    stories: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return [
          {
            id: 2,
            title: "Story 1",
          },
          {
            id: 3,
            title: "Story 2",
          },
        ];
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
    reviews: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return [
          {
            id: 1,
            score: 5,
          },
          {
            id: 2,
            score: 5,
          },
        ];
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

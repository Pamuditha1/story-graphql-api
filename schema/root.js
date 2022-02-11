const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const books = [
  { id: 1, name: "AAA", genre: "aaa", author: 1 },
  { id: 2, name: "BBB", genre: "bbb", author: 2 },
  { id: 3, name: "CCC", genre: "ccc", author: 1 },
];

const authors = [
  { id: 1, name: "Pa", age: 23 },
  { id: 2, name: "Ra", age: 25 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors[0];
        // .filter((a) => {
        //   if (a.id === parent.author) return true;
        // });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return [books[0], books[2]];
        // .filter((a) => {
        //   if (a.id === parent.author) return true;
        // });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return {
          id: args.id,
          name: "Hello",
        };
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return {
          id: args.id,
          name: "Author",
        };
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        authors.push(args);
        return authors[authors.length - 1];
      },
    },
  },
});
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

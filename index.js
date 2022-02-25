// apollo-server

const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const { typeDefs } = require("./apollo/schema");

const { Query } = require("./apollo/resolvers/Query");
const { User } = require("./apollo/resolvers/User");
const { Story } = require("./apollo/resolvers/Story");

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Could not Connect to mongoDB", err);
  });

const resolvers = {
  Query,
  User,
  Story,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("Server is listening on " + url);
});
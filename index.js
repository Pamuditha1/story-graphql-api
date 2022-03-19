// apollo-server

const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
//const { MongoClient } = require("mongodb");
require("dotenv").config();

// const UserModel = require("./models/User.js");
// const Users = require("./apollo/dataSourses/mongodb.js");

const { typeDefs } = require("./apollo/schema");

const { Query } = require("./apollo/resolvers/Query");
const { Mutation } = require("./apollo/resolvers/Mutation");
const { User } = require("./apollo/resolvers/User");
const { Story } = require("./apollo/resolvers/Story");

// const client = new MongoClient(process.env.MONGODB_URI);
// client.connect();

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
  Mutation,
  User,
  Story,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // dataSources: () => ({
  //   users: new Users(UserModel.User),
  // }),
});

server.listen({ port: 4500 }).then(({ url }) => {
  console.log("Server is listening on " + url);
});

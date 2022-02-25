const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: String
    user(id: ID!): User
    users: [User]
    story(id: ID!): Story
    stories(filter: StoriesFilterInput): [Story]
    review(id: ID!): Review
    reviews: [Review]
  }

  type User {
    id: ID!
    username: String!
    age: Int
    country: String
    email: String!
    password: String
    stories(filter: StoriesFilterInput): [Story]
    reviews: [Review]
  }

  type Story {
    id: ID!
    title: String!
    details: String
    location: String
    timeStamp: String!
    image: String!
    visible: Boolean!
    user: User!
    reviews: [Review]
  }

  type Review {
    id: ID!
    score: Int!
    timeStamp: String!
    user: User!
    story: Story!
  }

  input StoriesFilterInput {
    visible: Boolean
  }
`;
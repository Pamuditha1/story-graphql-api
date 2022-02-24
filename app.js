const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/root");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

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

app.use(cors());
app.use("/api", graphqlHTTP({ schema, graphiql: true }));

app.listen(3010, () => console.log("Listening on Port 3010"));

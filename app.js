const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/root");
const cors = require("cors");

const app = express();

app.use(cors());
app.use("/api", graphqlHTTP({ schema, graphiql: true }));

app.listen(3010, () => console.log("Listening on Port 3010"));

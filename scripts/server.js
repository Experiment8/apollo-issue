const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Message {
    id  : ID
    message: String
  }
  type Query {
    getMessage(id: ID!) : Message
  }
  type Mutation {
    setMessage(message: String): Message
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  setMessage: message => message
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  formatError(err) {
    return {
      message: 'Hello World',
      code: err.originalError && err.originalError.code,   // <--
      locations: err.locations,
      path: err.path
    };
  }
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');

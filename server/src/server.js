require('colors');
require('dotenv').config({ path: '../.env' });

const { ApolloServer } = require('apollo-server');

const { typeDefs } = require('./graphql/typeDefs.js');
const { Query } = require('./graphql/resolvers/index.js');
const { context } = require('./graphql/context');

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers: { Query }, context });

  const { url } = await server.listen();

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.log(
      `
    🚀  GraphQL Server is running!
    🔉  Listening on port 4000
    📭  Query at ${url}
  `.magenta.bold
    );
  }
}

startApolloServer();

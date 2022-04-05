require('colors');
require('dotenv').config({ path: '../.env' });

const { ApolloServer } = require('apollo-server');

const { typeDefs } = require('./graphql/typeDefs.js');
const { Query } = require('./graphql/resolvers/index.js');

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers: { Query } });

  const { url } = await server.listen();
  console.log(`🚀 Apollo Server running at ${url}`.yellow.bold);
}

startApolloServer();

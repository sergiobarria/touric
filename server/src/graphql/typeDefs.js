const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Get available tours from database"
    tours: [Tour!]!

    "Get a single tour by ID"
    tour(id: ID!): Tour!
  }

  type Tour {
    """
    Schema definition for a Tour
    """
    id: ID!
    name: String!
    slug: String!
    summary: String!
    description: String!
    duration: Int!
    maxGroupSize: Int!
    ratingsAverage: Float!
    ratingsQuantity: Int!
    price: Int!
    imageCover: String!
    images: [String!]!
    startDates: [String!]!
    difficulty: Difficulty
    createdAt: String
    updatedAt: String
  }

  enum Difficulty {
    easy
    medium
    difficult
  }
`;

module.exports = { typeDefs };

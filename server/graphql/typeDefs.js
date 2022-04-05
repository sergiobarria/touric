const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    tours: [Tour!]!
    tour(id: ID!): Tour!
  }

  type Tour {
    """
    Describes a Tour model
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

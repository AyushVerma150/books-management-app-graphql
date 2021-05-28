const { gql } = require( 'apollo-server-express' );
const userType = require( './user' );
const bookType = require( "./book" );

const rootType = gql`
 type Query {
     root: String!
 }
 type Mutation {
     root: String!
 }

`;

module.exports = [rootType, userType, bookType];
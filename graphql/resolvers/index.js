//Combine all resolvers of the app
const userResolvers = require( './user' );
const bookResolvers = require( "./book" );

module.exports = [userResolvers, bookResolvers];
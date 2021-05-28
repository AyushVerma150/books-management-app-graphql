const express = require( 'express' );
const { createServer } = require( 'http' );
const { ApolloServer } = require( 'apollo-server-express' );
const cors = require( 'cors' );
const typeDefs = require( '../graphql/schemas' );
const resolvers = require( '../graphql/resolvers' );
const context = require( '../graphql/context' );
const app = express();
// const User = require( '../models/user' );
// const Book = require( '../models/book' );
const sequelize = require( '../helpers/database' );

try
{
    sequelize.sync();
}
catch ( err )
{
    console.log( err );
}

app.use( cors() );

const apolloServer = new ApolloServer( {
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: {
        settings: {
            'schema.polling.enable': false,
        },
    },
} );

apolloServer.applyMiddleware( { app, path: '/api' } );

const server = createServer( app );

module.exports = server;
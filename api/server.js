//lib imports
const cors = require( 'cors' );
const express = require( 'express' );
const { createServer } = require( 'http' );
const { ApolloServer } = require( 'apollo-server-express' );
const app = express();

//imports for GraphQl Schema
const typeDefs = require( '../graphql/schemas' );
const resolvers = require( '../graphql/resolvers' );
const context = require( '../graphql/context' );

//applying CORS
app.use( cors() );

//creating GraphQl Playground
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

//path to playground
apolloServer.applyMiddleware( { app, path: '/api' } );

const server = createServer( app );

module.exports = server;
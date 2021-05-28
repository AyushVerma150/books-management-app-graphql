const { gql } = require( "apollo-server-express" );


module.exports = gql`

type Book
{
    id:Int!
    title:String!
    published:String!
    overview:String!
    cost:Int!
    pages:Int!
    isbn10:String!
    publishingCompany:String!
}

extend type Query
{
    viewBooks: [Book!]
}

extend type Mutation
{
    addBook(input: BookInput!) : BookResponse
}

input BookInput
{
    title:String!
    published:String!
    overview:String!
    cost:Int!
    pages:Int!
    isbn10:String!
    publishingCompany:String!
}

type BookResponse
{
    id:Int!
    title:String!
    published:String!
    overview:String!
    cost:Int!
    pages:Int!
    isbn10:String!
    publishingCompany:String!

}
`;
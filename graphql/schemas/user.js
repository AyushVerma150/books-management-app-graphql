const { gql } = require( "apollo-server-express" );

module.exports = gql`

    type User
    {
        id:Int!
        firstName:String!
        lastName:String!
        email:String!
        password:String!
        books:[Book!]
    }

    extend type Query
    {
        fetchUsers:[RegisterResponse!] 
    }

    extend type Mutation
    {
        register(input:RegisterInput!) : AuthPayload
        login(input:LoginInput!): AuthPayload
        editUser(input:EditUserInput!): RegisterResponse
    }

    input RegisterInput
    {
        email:String!
        lastName:String!
        password:String!
        firstName:String!
        confirmPassword:String!
    }

    input LoginInput
    {
        email:String!
        password:String!
    }

    input EditUserInput
    {
        email:String!
        lastName:String
        firstName:String
    }

    type AuthPayload
    {
        token:String
        user: User
    }

    type RegisterResponse
    {
        id:Int!
        firstName:String!
        lastName:String!
        email:String!
    }
`;
const utils = require( "../../utils/utils" );
const constants = require( "../../constants/constants" );
const bookSequelizeQueries = require( "../../queries/book" );

const { AuthenticationError } = require( 'apollo-server-express' )

module.exports =
{
    Query:
    {
        viewBooks: async ( root, args, { user = null } ) =>
        {
            if ( !user )
            {
                throw new AuthenticationError( constants.ERROR.LOGIN_USER );
            }
            const booksAuthored = await bookSequelizeQueries.viewBooks( user );
            if ( booksAuthored )
            {
                return booksAuthored;
            }
            throw new AuthenticationError( constants.ERROR.BOOK_CREATED );

        }
    },
    Mutation:
    {
        addBook: async ( root, args, { user = null } ) =>
        {
            if ( !user )
            {
                throw new AuthenticationError( constants.ERROR.LOGIN_USER );
            }
            const bookAuthored = await bookSequelizeQueries.addBook( args.input, user );
            if ( bookAuthored )
            {
                return bookAuthored.dataValues;
            }
            throw new AuthenticationError( constants.ERROR.BOOK_CREATED );
        }

    }
};
const constants = require( "../../constants/constants" );
const bookSequelizeQueries = require( "../../queries/book" );

const { AuthenticationError } = require( 'apollo-server-express' )

module.exports =
{
    Query:
    {
        viewBooks: async ( root, args, { user = null } ) =>
        {
            //checking for user logged in
            if ( !user )
            {
                throw new AuthenticationError( constants.ERROR.LOGIN_USER );
            }

            // if user is logged in we fetch the books
            const booksAuthored = await bookSequelizeQueries.viewBooks( user );

            //if fetch books is a success we return the response
            if ( booksAuthored )
            {
                return booksAuthored;
            }

            //if fetch books fail
            throw new AuthenticationError( constants.ERROR.BOOK_CREATED );

        }
    },
    Mutation:
    {
        addBook: async ( root, args, { user = null } ) =>
        {
            //checking for user logged in
            if ( !user )
            {
                throw new AuthenticationError( constants.ERROR.LOGIN_USER );
            }

            // if user is logged in we add the book
            const bookAuthored = await bookSequelizeQueries.addBook( args.input, user );

            //if book is successfully added we return the response
            if ( bookAuthored )
            {
                return bookAuthored.dataValues;
            }

            //if book addition failed
            throw new AuthenticationError( constants.ERROR.BOOK_CREATED );
        },
        // deleteBook(input:BookDelete!): BookResponse,
        editBook: async ( root, args, { user = null } ) =>
        {
            //checking for user logged in
            if ( !user )
            {
                throw new AuthenticationError( constants.ERROR.LOGIN_USER );
            }

            // if logged in we edit the books
            const fetchedBookDetails = await bookSequelizeQueries.editBook( args.input, user );

            //if book edit is a success we send the response
            if ( fetchedBookDetails )
            {
                return fetchedBookDetails.dataValues;
            }

            //if book edit failed
            throw new AuthenticationError( constants.ERROR.EDIT_BOOK );
        },

        deleteBook: async ( root, args, { user = null } ) =>
        {
            //checking for user logged in
            if ( !user )
            {
                throw new AuthenticationError( constants.ERROR.LOGIN_USER );
            }
            const { id } = args.input;
            const deletedBookDetails = await bookSequelizeQueries.deleteBook( id, user );

            //if book deletion is a success we send the response
            if ( deletedBookDetails )
            {
                return deletedBookDetails.dataValues;
            }

            //if book deletion failed
            throw new AuthenticationError( constants.ERROR.BOOK_DELETE );
        }

    }
};
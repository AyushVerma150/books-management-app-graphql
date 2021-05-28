const userSequelizeQueries = require( "../queries/user" );
const constants = require( "../constants/constants" );

const Book = require( "../models/book" );
const User = require( "../models/user" );


const addBook = async ( { title, published, overview, pages, publishingCompany, isbn10, cost }, { email } ) =>
{
    try
    {
        const userExists = await userSequelizeQueries.findUser( { email } );
        if ( userExists )
        {
            const bookAuthored = await userExists.createBook(
                {
                    title,
                    published,
                    overview,
                    pages,
                    publishingCompany,
                    isbn10,
                    cost
                }
            );
            if ( bookAuthored )
            {
                return bookAuthored;
            }
        }
    }
    catch ( err )
    {
        throw new Error( constants.ERROR.BOOK_CREATED );
    }

};

const viewBooks = async ( { id, email } ) =>
{
    try
    {
        const userExists = await userSequelizeQueries.findUser( { email } );
        if ( userExists )
        {
            const booksAuthored = await Book.findAll(
                {
                    where:
                    {
                        userId: id
                    }
                }
            );
            if ( booksAuthored )
            {
                return booksAuthored;
            }
        }
    }
    catch ( err )
    {
        throw new Error( constants.ERROR.BOOK_CREATED );
    }

}


module.exports = { addBook, viewBooks };

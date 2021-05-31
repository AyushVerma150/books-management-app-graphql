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

const editBook = async ( editedBookData, userDetails ) =>
{

    try
    {
        const { id } = editedBookData;
        const userId = userDetails.id;
        const fetchedBookDetails = await Book.findOne(
            {
                where:
                {
                    id,
                    userId
                }
            }
        );
        if ( fetchedBookDetails )
        {
            const updatedBook = await Book.update(
                editedBookData,
                {
                    where:
                    {
                        id
                    }
                }
            );

            if ( updatedBook )
            {
                const bookUpdated = await Book.findOne( { where: { id } } );
                return bookUpdated;
            }
        }
    }
    catch ( err )
    {
        throw new Error( constants.ERROR.BOOK_FOUND );
    }
}

const deleteBook = async ( deleteBookId, userData ) =>
{

    try
    {
        const userId = userData.id;
        const fetchedBookDetails = await Book.findOne(
            {
                where:
                {
                    id: deleteBookId,
                    userId
                }
            }
        );
        if ( fetchedBookDetails )
        {
            const deleteSuccess = await Book.destroy( {
                where: {
                    id: deleteBookId
                }
            } );

            if ( deleteSuccess )
            {
                return fetchedBookDetails;
            }
        }
    }
    catch ( err )
    {
        throw new Error( constants.ERROR.BOOK_DELETE );
    }

}



module.exports = { addBook, viewBooks, editBook, deleteBook };

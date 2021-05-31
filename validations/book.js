const { UserInputError } = require( 'apollo-server-express' )
const constants = require( "../constants/constants" );

class BookValidation
{
    validateISBN( { isbn10 } )
    {
        if ( !isbn10 || isbn10.length !== 10 )
        {
            throw new UserInputError( constants.VALIDATION.ISBN );
        }
    }
};

module.exports = BookValidation;
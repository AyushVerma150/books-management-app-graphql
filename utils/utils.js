//lib imports
require( 'dotenv' ).config();
const jwt = require( 'jsonwebtoken' );
const argon2 = require( "argon2" );

//errors
const { AuthenticationError } = require( 'apollo-server-express' )

//constants
const constants = require( "../constants/constants" );

//create JSON WEB TOKEN
const createAuthenticationToken = ( email ) =>
{
    try
    {
        return jwt.sign(
            { email },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.EXPIRES_IN }
        );
    }
    catch ( err )
    {
        throw new AuthenticationError( constants.ERROR.JWT_TOKEN )
    }
};

const encryptPassword = async ( password ) =>
{
    try
    {
        const hashedPassword = await argon2.hash( password );
        return hashedPassword;
    }
    catch ( err )
    {
        throw new AuthenticationError( constants.ERROR.HASH_PASSWORD )
    }
};


const comparePasswords = async ( hashedPassword, inputPassword ) =>
{
    try
    {
        const passwordVerified = await argon2.verify( hashedPassword, inputPassword );
        return passwordVerified;
    }
    catch ( err )
    {
        throw new AuthenticationError( constants.VALIDATION.PASSWORD_MISMATCH );
    }
}


module.exports = {
    createAuthenticationToken,
    encryptPassword,
    comparePasswords
};



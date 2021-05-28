require( 'dotenv' ).config();
const jwt = require( 'jsonwebtoken' );
const argon2 = require( "argon2" );



const createAuthenticationToken = ( email ) =>
{
    try
    {
        return jwt.sign( { email }, process.env.TOKEN_SECRET, { expiresIn: "1h" } );
    }
    catch ( err )
    {
        console.log( "Could not generate web token" );
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
        console.log( "Could not hash password" );
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
        console.log( "Could not hash password" );
    }
}


module.exports = {
    createAuthenticationToken,
    encryptPassword,
    comparePasswords
};



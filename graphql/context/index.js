require( 'dotenv' ).config();
const User = require( '../../models/user' );
const jwt = require( 'jsonwebtoken' );
const { AuthenticationError } = require( 'apollo-server-express' )


//we verify the JWT token that was created either at signup or at login...
const verifyToken = async ( token ) =>
{
    try
    {
        if ( !token ) return null;
        const { email } = await jwt.verify( token, process.env.TOKEN_SECRET );
        const user = await User.findOne( { where: { email } } );
        return user;

    } catch ( error )
    {
        throw new AuthenticationError( error.message );
    }
};

module.exports = async ( { req } ) =>
{
    const token = ( req.headers && req.headers.authorization ) || '';
    const user = await verifyToken( token )
    return { user };
};


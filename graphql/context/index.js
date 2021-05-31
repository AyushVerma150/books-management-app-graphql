require( 'dotenv' ).config();
const User = require( '../../models/user' );
const jwt = require( 'jsonwebtoken' );
const { AuthenticationError } = require( 'apollo-server-express' )


//we verify the JWT token that was created either at signup or at login...
const verifyToken = async ( token ) =>
{
    try
    {
        //if header does not contain a router
        if ( !token ) return null;

        //verify jwt
        const { email } = await jwt.verify( token, process.env.TOKEN_SECRET );

        //find user 
        const user = await User.findOne( { where: { email } } );

        //if user is fetched successfully then return user
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


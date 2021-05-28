const User = require( '../../models/user' );
const utils = require( "../../utils/utils" );
const constants = require( "../../constants/constants" );
const sequelizeQueries = require( "../../queries/user" );

const { AuthenticationError } = require( 'apollo-server-express' )

module.exports =
{
    Query:
    {
        root: () =>
        {
            return constants.SUCCESS.APP_RUNNING;
        },
        fetchUsers: async () =>
        {
            const users = await sequelizeQueries.fetchAllUsers();
            if ( users )
            {
                return users;
            }
        }
    },

    Mutation:
    {
        register: async ( root, args, context ) =>
        {
            const hashedPassword = await utils.encryptPassword( args.input.password );
            if ( hashedPassword )
            {
                args.input.password = hashedPassword;
            }
            const userAlreadyExists = await sequelizeQueries.findUser( args.input );
            if ( userAlreadyExists )
            {
                throw new AuthenticationError( constants.ERROR.USER_CREATED );
            }
            else
            {
                const userCreated = await sequelizeQueries.createUser( args.input );
                const token = utils.createAuthenticationToken( args.input.email );
                return {
                    token,
                    user: userCreated.dataValues
                };
            }

        },

        login: async ( root, args, context ) =>
        {
            const { email, password } = args.input;
            const userFound = await sequelizeQueries.findUser( args.input );
            const passwordMatch = await utils.comparePasswords( userFound.password, password );
            if ( userFound && passwordMatch )
            {
                const token = utils.createAuthenticationToken( email );
                return {
                    token,
                    user: userFound.dataValues
                }
            }
            throw new AuthenticationError( constants.ERROR.INVALID_CREDENTIALS );
        },
    }

};
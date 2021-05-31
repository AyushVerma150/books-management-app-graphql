//lib imports
const utils = require( "../../utils/utils" );
const constants = require( "../../constants/constants" );
const sequelizeQueries = require( "../../queries/user" );
const UserValidationClass = require( '../../validations/user' );

//Authenticating user input
const { AuthenticationError } = require( 'apollo-server-express' )
const UserValidation = new UserValidationClass();

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
            //validating user input
            UserValidation.validateEmail( args.input );
            UserValidation.validatePassword( args.input );
            UserValidation.validateFirstName( args.input );
            UserValidation.validateLastName( args.input );
            UserValidation.validateConfirmPassword( args.input );

            //hash user entered password
            const hashedPassword = await utils.encryptPassword( args.input.password );
            if ( hashedPassword )
            {
                args.input.password = hashedPassword;
            }

            //checking for an existing user
            const userAlreadyExists = await sequelizeQueries.findUser( args.input );
            if ( userAlreadyExists )
            {
                throw new AuthenticationError( constants.ERROR.USER_CREATED );
            }
            else
            {
                //create user if all validation checks are passed
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
            //user validations
            UserValidation.validateEmail( args.input );
            UserValidation.validatePassword( args.input );

            const { email, password } = args.input;

            //checking if user exists or not 
            const userFound = await sequelizeQueries.findUser( args.input );

            //comparing passwords
            const passwordMatch = await utils.comparePasswords( userFound.password, password );

            //if user exists and password matches we let user login in
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
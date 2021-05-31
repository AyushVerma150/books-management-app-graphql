const { UserInputError } = require( 'apollo-server-express' )

const emailValidator = require( 'email-validator' );
const passwordValidator = require( "password-validator" );

const constants = require( "../constants/constants" );
const passwordSchema = new passwordValidator();

passwordSchema
    .is().min( 8 )
    .is().max( 20 )
    .has().uppercase()
    .has().digits( 1 )
    .has().lowercase()
    .has().not().spaces()

class UserValidation
{
    validateEmail( { email } )
    {
        if ( !emailValidator.validate( email ) )
        {
            throw new UserInputError( constants.VALIDATION.EMAIL );
        }
    }

    validatePassword( { password } )
    {
        if ( !passwordSchema.validate( password ) )
        {
            throw new UserInputError( constants.VALIDATION.PASSWORD );
        }
    }

    validateFirstName( { firstName } )
    {
        if ( ( !firstName || firstName.trim().length === 0 ) )
        {
            throw new UserInputError( constants.VALIDATION.FIRST_NAME );
        }
    }

    validateLastName( { lastName } )
    {
        if ( ( !lastName || lastName.trim().length === 0 ) )
        {
            throw new UserInputError( constants.VALIDATION.LAST_NAME );
        }
    }

    validateConfirmPassword( { password, confirmPassword } )
    {
        if ( ( ( !password || !confirmPassword ) || !( password === confirmPassword ) ) )
        {
            throw new UserInputError( constants.VALIDATION.PASSWORD_MISMATCH );
        }
    }
};

module.exports = UserValidation;
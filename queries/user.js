const User = require( '../models/user' );
const Book = require( "../models/book" );
const constants = require( "../constants/constants" );

const createUser = async ( { firstName, lastName, email, password } ) =>
{
    try
    {
        const userCredentials = await User.create(
            {
                firstName,
                lastName,
                email,
                password
            } );

        return userCredentials;
    }
    catch ( err )
    {
        throw new Error( constants.ERROR.USER_CREATED );
    }
};

const findUser = async ( { email } ) =>
{
    try
    {
        const userCredentials = await User.findOne(
            {
                where: { email },
                include: { model: Book, attributes: constants.USER.BOOK_ATTRIBUTES }
            } );

        return userCredentials;
    }
    catch ( err )
    {
        throw new Error( constants.ERROR.USER_FOUND )
    }
};

const fetchAllUsers = async () =>
{
    try
    {
        const userCredentials = await User.findAll();
        return userCredentials;
    }
    catch ( err )
    {
        throw new Error( constants.ERROR.USER_FOUND );
    }
};

module.exports = { createUser, findUser, fetchAllUsers };
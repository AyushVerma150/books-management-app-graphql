const constants =
{
    SUCCESS:
    {
        USER_FOUND: "User Found",
        APP_RUNNING: "App is Running",
        LOGIN: "Login Successful"
    },
    ERROR:
    {
        USER_EXISTS: "User already exists",
        HASH_PASSWORD: "Could not hash password",
        USER_FOUND: "User not found",
        USER_CREATED: "Could not create user",
        INVALID_CREDENTIALS: "Invalid Credentials",
        LOGIN_USER: "Please login to continue",
        BOOK_CREATED: "Could not author book"
    }

};


module.exports = Object.freeze( constants );
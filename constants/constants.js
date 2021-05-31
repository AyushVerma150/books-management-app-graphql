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
        BOOK_CREATED: "Could not author book",
        BOOK_FOUND: "No such book found",
        EDIT_BOOK: "Cannot edit book details",
        BOOK_DELETE: "Cannot delete Book",
        JWT_TOKEN: "Could not create Token"
    },
    USER:
    {
        BOOK_ATTRIBUTES: ["id", "title", "overview", "publishingCompany", "published", "cost", "isbn10", "pages"]
    },
    VALIDATION:
    {
        EMAIL: "Not a valid email",
        PASSWORD: "Please enter a password with lowercase , uppercase , digits and symbols",
        FIRST_NAME: "Please enter a valid first name",
        LAST_NAME: "Please enter a valid last name",
        PASSWORD_MISMATCH: "Passwords do not match",
        ISBN: "Not a valid ISBN code"
    }
};


module.exports = Object.freeze( constants );
//lib imports
const Sequelize = require( 'sequelize' );

//sequelize instance
const sequelize = require( '../helpers/database' );

//Book Model
const Book = require( './book' );

//User Model
const User = sequelize.define( 'user',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false

        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false

        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
    } );


//Creating One to Many Association between User and Book model respectively
Book.belongsTo( User, { constraints: true, onDelete: 'CASCADE' } );
User.hasMany( Book );

module.exports = User;
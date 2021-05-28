const Sequelize = require( 'sequelize' );
const sequelize = require( '../helpers/database' );
const Book = require( './book' );


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


Book.belongsTo( User, { constraints: true, onDelete: 'CASCADE' } );
User.hasMany( Book );

module.exports = User;
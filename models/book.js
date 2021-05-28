
const Sequelize = require( 'sequelize' );

const sequelize = require( '../helpers/database' );

const Book = sequelize.define( 'book',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false

        },
        overview: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isbn10: {
            type: Sequelize.STRING,
            allowNull: false
        },
        publishingCompany: {
            type: Sequelize.STRING,
            allowNull: false
        },
        published: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pages: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    } );

module.exports = Book;
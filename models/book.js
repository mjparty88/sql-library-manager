const Sequelize = require('sequelize');

//create library database instance
const sequelize = new Sequelize({
  logging: (...msg) => console.log(msg), // Displays all log function call parameters
  dialect: 'sqlite',
  storage: 'library.db'
});

//Define and initialize the Book model
module.exports = (sequelize) => {
class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The title of the book is required"
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The author of the book is required"
        }
      }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER,
  }, { sequelize, modelName: 'Book' } );

  return Book
};

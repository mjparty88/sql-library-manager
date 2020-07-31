const express = require('express');
const router = express.Router();
const Book = require('../models').Book //this allows use to use all the Sequelize methods on the Book model;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
      console.log("We encountered an error", error)
    }
  }
}

/* GET the full list of books */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render("books/index", {books});
}));

/* GET the create new book form */
router.get('/new', asyncHandler(async (req, res) => {
  //res.render();
}));

/* POST a new book to the database */
router.post('/new', asyncHandler(async (req, res) => {
  //res.render();
}));

/* GET a specific book from the database */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  console.log(book.title)
  res.render("books/book", {book});
}));

/* GET the form to update specific book information to the database */
router.get('/:id/edit', asyncHandler(async (req, res) => {
  //res.render();
}));

/* POST updated information about a specific book to the database */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  //res.render();
}));

/* GET the book deletion page */
router.get('/:id/delete', asyncHandler(async (req, res) => {
  //res.render();
}));

/* POST to delete the book */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  //res.render();
}));


module.exports = router;

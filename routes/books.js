const express = require('express');
const router = express.Router();
const Book = require('../models').Book //this allows use to use all the Sequelize methods on the Book model;
const { Op } = require('sequelize');

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

/* notfound() function
- has the response from the middleware passed to it
- sends 404 as the error status in the response
- renders the page-not-found view
*/

function notFound(res, err) {
  res.status(err.status = 404);
  res.render("books/page-not-found", {err})
}

/* calcPagination() function
- takes an object containing books as an argument, plus the request that called the function
- calculates the number of pagination links to return and store in numPages
- if numPages is greater than one, add push onto an pages array
- otherwise, set the pages array to undefined
- return the pages array
*/
async function calcPagination(booksObj, req) {
  let pages = [];
  let count = 0;
  for (bookObj in booksObj) {
    count += 1;
  }
  const numPages = Math.ceil(count / 10);
  if(numPages > 1) {
    for(let i = 0; i < numPages; i++) {
      if(req.originalUrl.includes("search")) {
        pages.push({
          pageNo: i+1,
          hrefLink: `/books/search/${req.params.string}/page/${i+1}`
        });
      } else {
        pages.push({
          pageNo: i+1,
          hrefLink: `/books/page/${i+1}`
        })
      }

    }
  } else {
    pages = undefined;
  }
  return pages;
}


/*Middleware routes*/

/* GET the full list of books */
router.get('/', asyncHandler(async (req, res) => {
  /*
    //implement the pages
    const totalBooks = await Book.findAll();
    const pages = await calcPagination(totalBooks, req);
    //console.log(pages)
    const books = await Book.findAll({
      limit: 10, // limiting for pagination
      order: [ //returning the books by author (alphabetical), and then year
        ['author', 'ASC'],
        ['year', 'ASC']
      ]
    });
    res.render("books/index", {books, pages});
  */
  res.redirect('/books/page/1');
}));

/* GET the results of each page link */

router.get('/page/:pageid', asyncHandler(async (req, res) => {
  //implement the pages
  const totalBooks = await Book.findAll();
  const pages = await calcPagination(totalBooks, req);
  //console.log(pages)
  const books = await Book.findAll({
    limit: 10, // limiting for pagination
    offset: (req.params.pageid - 1) * 10, // set the offset by pageid
    order: [ //returning the books by author (alphabetical), and then year
      ['author', 'ASC'],
      ['year', 'ASC']
    ]
  });
  res.render("books/index", {books, pages});
}));

/* POST a search result on the main page*/
router.post('/search', asyncHandler(async (req, res) => {
  const searchString = req.body.searchString;
  if(req.body.searchString == ''){
    res.redirect('/books');
  } else {
    res.redirect(`/books/search/${searchString}`)
    }
}));

/* GET the list of books that match the search criteria */
router.get('/search/:string', asyncHandler(async (req, res) => {
  /*
    console.log("looking for books and authors like " + req.params.string)
    const totalBooks = await Book.findAll({
      where: {
        [Op.or]: [ //search will be against either the title or author
          {
            title: {
              [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
            }
          },
          {
            author: {
              [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
            }
          },
          {
            genre: {
              [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
            }
          }
        ]
      },
      order: [
        ['author', 'ASC'],
        ['year', 'ASC']
      ]
    });
    const pages = await calcPagination(totalBooks, req);
    const books = await Book.findAll({
      where: {
        [Op.or]: [ //search will be against either the title or author
          {
            title: {
              [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
            }
          },
          {
            author: {
              [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
            }
          },
          {
            genre: {
              [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
            }
          }
        ]
      },
      limit: 10, // limiting for pagination
      order: [
        ['author', 'ASC'],
        ['year', 'ASC']
      ]
    });
    res.render("books/index", {books, pages});
  */
  res.redirect(`/books/search/${req.params.string}/page/1`);
}));

/* GET the list of books that match the search criteria, and pagination*/

router.get('/search/:string/page/:pageid', asyncHandler(async (req, res) => {
  console.log("looking for books and authors like " + req.params.string)
  const totalBooks = await Book.findAll({
    where: {
      [Op.or]: [ //search will be against either the title or author
        {
          title: {
            [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
          }
        },
        {
          author: {
            [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
          }
        },
        {
          genre: {
            [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
          }
        }
      ]
    },
    order: [
      ['author', 'ASC'],
      ['year', 'ASC']
    ]
  });
  const pages = await calcPagination(totalBooks, req);
  const books = await Book.findAll({
    where: {
      [Op.or]: [ //search will be against either the title or author
        {
          title: {
            [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
          }
        },
        {
          author: {
            [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
          }
        },
        {
          genre: {
            [Op.like]: `%${req.params.string}%` //case insensitive like comparison on the title (SQLite implements LIKE as case-insensitive)
          }
        }
      ]
    },
    limit: 10, // limiting for pagination
    offset: (req.params.pageid - 1) * 10, // set the offset by pageid
    order: [
      ['author', 'ASC'],
      ['year', 'ASC']
    ]
  });
  res.render("books/index", {books, pages});
}));

/* GET the create new book form */
router.get('/new', asyncHandler(async (req, res) => {
  res.render("books/new-book");
}));

/* POST a new book to the database */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/')
  } catch(error) {
    if(error.name == 'SequelizeValidationError') {
      book = await Book.build(req.body);
      res.render("books/new-book", { book, error })
    }
  }
}));

/* GET a specific book from the database */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    //if the book exists render it
    res.render("books/book", {book});
  } else {
    //otherwise call notFound(res)
    const err = new Error("Page Not Found")
    err.status = 404
    notFound(res, err)
  }
}));

/* GET the form to update specific book information to the database */
router.get('/:id/edit', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/update-book", {book});
}));

/* POST updated information about a specific book to the database */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      //if the book exists updated the book, and redirect to he book's read only page
      await book.update(req.body)
      res.redirect("/books/" + book.id)
    } else {
      //otherwise call notFound(res)
      const err = new Error("Page Not Found")
      err.status = 404
      notfound(res, err);
    }
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id; // make sure correct article gets updated
      res.render("books/update-book", {book, error})
    } else {
      throw error;
    }
  }
}));

/* POST to delete the book */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    //if the book exists destroy it and redirect to the index page
    await book.destroy()
    res.redirect("/books");
  } else {
    //otherwise call notFound(res)
    notfound(res);
  }
}));


module.exports = router;

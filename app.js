const express = require('express');
const bodyParser = require('body-parser')
const mainRouter = require('./routes')
const booksRouter = require('./routes/books')

const app = express();

let port = process.env.PORT || 3000; //sets the port to the PORT environment variable (in prod), or 3000 in dev.

//sets pug as the view engine
app.set('view engine', 'pug');

//for pasrsing application/json
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//applies the static routes
app.use('/static', express.static('public'));
app.use('/', mainRouter);

/*
Middleware to strip trailing slashes from express routes unless its '/'.
Using a small middleware, we can redirect (301) all requests with a trailing slash to one without
https://amitd.co/code/javascript/strip-trailing-slashes-from-express-requests
*/
app.use(function(req, res, next) {
    if (req.path.substr(-1) == '/' && req.path.length > 1) {
        let query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  console.log(err.status)
  res.status(err.status || 500);
  res.render('books/page-not-found', {err});
  // send a friendly message to the console
  console.log("An error was found", err)
});

//listens on the port
app.listen(port, () => console.log(`The app is listening at http://localhost:${port}`));

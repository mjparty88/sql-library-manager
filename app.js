const express = require('express');
const mainRouter = require('./routes')
const booksRouter = require('./routes/books')

const app = express();

let port = process.env.PORT || 3000; //sets the port to the PORT environment variable (in prod), or 3000 in dev.

//sets pug as the view engine
app.set('view engine', 'pug');

//applies the static routes
app.use('/static', express.static('public'));
app.use('/', mainRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  err = new Error("Page Not Found")
  err.status = 404
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('books/error');

  // send a friendly message to the console
  console.log("An error was found", err)
});

//listens on the port
app.listen(port, () => console.log(`The app is listening at http://localhost:${port}`));

This is my SQL Library Manager project -  Unit 8 of the Team Treehouse Techdegree.

Dependencies:
-Sequelize
-Sequelize CLI
-Sqlite3
-Express
-Pug

To run, clone the git repository, navigate to the project folder, and enter 'npm start'.

Notes:

I have changed the process to edit and deleting books from the base rubric. Selecting on a book in the library will open the 'books/book' view (which I've made as a read-only screen with form input fields disabled.

In order to edit or delete information about the book, the user must first select the 'edit' button from within the 'books/book' view. Doing sp renders the 'books/update-book' view with form input fields enabled. The user will be able to edit, save, and delete the record from this view.

This has been done to add additional protection to the information in the library database. Minor adjustments to styles have also been made to visually indicate the actions associated with the buttons (i.e. red for delete).

The search form implements a SELECT query WHERE the value of the search field is LIKE title OR LIKE author OR LIKE Fantasy, OR (in the case that a year is inputted - i.e. '1997') is equal to the published year. Searching for an empty string clears the additional conditions on the SELECT query.

Pagination works for with search criteria and without search criteria.

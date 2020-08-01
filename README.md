This is my SQL Library Manager project -  Unit 8 of the Team Treehouse Techdegree.

Dependencies:
-Sequelize
-Sequelize CLI
-Sqlite3
-Express
-Pug

I have changed the process to edit and deleting books from the base rubric. Selecting on a book in the library will open the 'books/book' view (which I've made as a read-only screen with form input fields disabled.

In order to edit or delete information about the book, the user must first select the 'edit' button from within the 'books/book' view. Doing sp renders the 'books/update-book' view with form input fields enabled. The user will be able to edit, save, and delete the record from this view.

This has been done to add additional protection to the information in the library database. Minor adjustments to styles have also been made to visually indicate the actions associated with the buttons (i.e. red for delete).  

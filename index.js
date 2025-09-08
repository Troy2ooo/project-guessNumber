const express = require('express');
const userRoutes = require('./src/routes/user/user-routes');
const probeRoutes = require('./src/routes/probe/probe-routes');
const booksRoutes = require('./src/routes/book/book-routes');
const authorsRoutes = require('./src/routes/authors/authors-routers')
const loansRoutes = require('./src/routes/book/book-loans-routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/probe', probeRoutes);
app.use('/users', userRoutes);
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/books-loans', loansRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

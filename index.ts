

import express, { Application } from "express";

const authRoutes = require('./src/routes/auth-routes/auth-routes');
import userRoutes from './src/routes/user-routes/user-routes';
import  probeRoutes  from './src/routes/probe-routes/probe-routes';
const booksRoutes = require('./src/routes/book-routes/book-routes');
const authorsRoutes = require('./src/routes/authors-routes/authors-routes');
const loansRoutes = require('./src/routes/book-routes/book-loans-routes');

import * as dotenv from "dotenv";
dotenv.config();


const PORT: number = Number(process.env.PORT) || 3000;
const app: Application  = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/probe', probeRoutes);
app.use('/users', userRoutes);
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/books-loans', loansRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

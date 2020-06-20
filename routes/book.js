const express = require("express");
const {
  getBookById,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
} = require("../controllers/book");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getAuthorById } = require("../controllers/author");

const router = express.Router();

//all parameters
router.param("authorId", getAuthorById);
router.param("bookId", getBookById);

//Routing

// POST
// Crate Book
router.post("/book/create/:authorId", isSignedIn, isAuthenticated, createBook);

// PUT
// Update Book by id
router.put("/book/:bookId/:authorId", isSignedIn, isAuthenticated, updateBook);

// DELETE
// Delete book by id
router.delete(
  "/book/:bookId/:authorId",
  isSignedIn,
  isAuthenticated,
  deleteBook
);

// GET
// List all books
router.get("/books", getAllBooks);

// GET
// Get a book by ID
router.get("/book/:bookId", getBook);

module.exports = router;

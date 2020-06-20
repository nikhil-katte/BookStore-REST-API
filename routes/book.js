const express = require("express");
const router = express.Router();
const { getBookById, getBook,createBook,updateBook,deleteBook,getAllBooks } = require("../controllers/book");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getAuthorById } = require("../controllers/author");

//all parameters
router.param("authorId", getAuthorById);
router.param("bookId", getBookById);

//Routingg

router.post("/book/create/:authorId", isSignedIn, isAuthenticated, createBook);
router.put("/book/:bookId/:authorId",isSignedIn,isAuthenticated,updateBook)
router.delete("/book/:bookId/:authorId",isSignedIn,isAuthenticated,deleteBook)
router.get("/books",getAllBooks)
router.get("/book/:bookId",getBook)
module.exports = router
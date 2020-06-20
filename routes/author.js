const Author = require("../models/author");
const express = require("express");
const {
  getAuthorById,
  getAuthor,
  getBookByAuthor,
} = require("../controllers/author");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const router = express.Router();

//Params
router.param("authorId", getAuthorById);

//Routes

//GET
//To get Author by ID
router.get("/author/:authorId", getAuthor);

//GET
// To list all books of that author(created by him/her)
router.get(
  "/author/book/:authorId",
  isSignedIn,
  isAuthenticated,
  getBookByAuthor
);

// GET
// To view profile
router.get("/author/:authorId", isSignedIn, isAuthenticated, getAuthor);

module.exports = router;

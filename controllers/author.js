const Author = require("../models/author");
const Book = require("../models/books");
const author = require("../models/author");

exports.getAuthorById = (req, res, next, id) => {
  Author.findById(id).exec((err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: "No author was found in DB",
      });
    }
    req.profile = author;
    next();
  });
};

exports.getAuthor = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.__v = undefined;
  return res.json(req.profile);
};

exports.getBookByAuthor = (req, res) => {
  Book.find({ author: req.profile._id }).exec((err, books) => {
    if (err) {
      console.log(err);
    } else {
      books.map((book) => (book.coverImage = undefined));
      return res.send(books);
    }
  });
};


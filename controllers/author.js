const Author = require("../models/author");
const Book = require("../models/books");


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
  

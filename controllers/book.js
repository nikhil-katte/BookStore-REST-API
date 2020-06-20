const Book = require("../models/books");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getBookById = (req, res, next, id) => {
  Book.findById(id)
    .populate("author")
    .exec((err, book) => {
      if (err) {
        return res.status(400).json({ error: "Book not Found" });
      }
      req.book = book;
      next();
    });
};

exports.getBook = (req, res) => {
  req.book.coverImage = undefined;
  return res.json(req.book);
};

exports.createBook = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Poblem with Cover Image",
      });
    }
    //restructurng the field
    const { price, title, description, author } = fields;
    if (!description || !price || !title || !author) {
      return res.status(400).json({
        error: "please include all the required fields",
      });
    }

    let book = new Book(fields);

    //handling of cover image
    if (file.coverImage) {
      if (file.coverImage.size > 3000000) {
        return res.status(400).json({
          error: "coverImage is too big",
        });
      }
      book.coverImage.data = fs.readFileSync(file.coverImage.path);
      book.coverImage.contentType = file.coverImage.type;
    }

    // if evrything goes ryt save to db

    book.save((err, book) => {
      if (err) {
        res.status(400).json({
          error: "Saving CoverImage in DB failed",
        });
      }
      res.json(book);
    });
  });
};

exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate(
      {_id : req.book._id},
      {$set : req.body},
      {new : true , bookFindAndModify:false},
      (err,book)=>{
          if (err||!book){
              return res.status(400).json({
                  error:err,
                  message:"Failed to update"
              })
          }
          res.json(book)
      }
  )
};

exports.deleteBook = (req, res) => {
  let book = req.book;
  book.remove((err, deleteBook) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete",
      });
    }
    res.json({
      message: "Successfully Deleted",
      deleteBook,
    });
  });
};
exports.getAllBooks = (req, res) => {
  Book.find({}).exec((err, books) => {
    if (err) {
      return res.status(400).json({
        error: "Books not found",
      });
    }
    return res.json(books)
  });
};

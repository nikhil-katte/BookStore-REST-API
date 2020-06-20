var jwt = require("jsonwebtoken");
const Author = require("../models/author");
var expressJwt = require("express-jwt");
const { check, validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json({ message: error.array()[0].param, error: error.array()[0].msg });
  }
  const author = new Author(req.body);
  author.save((err, author) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      name: author.name,
      email: author.email,
      id: author._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      message: errors.array()[0].param,
    });
  }
  Author.findOne({ email }, (err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: "User email does not exists",
      });
    }

    if (!author.authenticate(password)) {
      return res.status(401).json({
        error: "emial and password do not mattch",
      });
    }
    //create token
    const token = jwt.sign({ _id: author._id }, process.env.SECERET);
    //put token in cookkkie
    res.cookie("token", token, { expire: new Date() + 999999 });
    ///ssend response to front eend
    const { _id, name, email, role } = author;
    return res.json({ token, author: { _id, name, email } });
  });
};
//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECERET,
  userProperty: "auth",
});

//custom middle ware
exports.isAuthenticated = (req, res, next) => {
  console.log(req);
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

const Author =require("../models/author")
const express = require("express")
const router = express.Router()
const{getAuthorById,getAuthor} =require("../controllers/author") 
const {isSignedIn,isAuthenticated}= require("../controllers/auth");


router.param("authorId" ,getAuthorById);
router.get("/author/:authorId",isSignedIn,isAuthenticated,getAuthor);
module.exports = router;

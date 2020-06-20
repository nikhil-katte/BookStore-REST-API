var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var Schema = mongoose.Schema;
var bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required:true,
    },
    author: {
      type: ObjectId,
      ref: "Author",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    coverImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("Book", bookSchema);

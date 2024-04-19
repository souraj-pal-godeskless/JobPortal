const mongoose = require('mongoose')
//title, description (markdown
// support is a plus), location, deadline, contact phone
// number and contact email
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    author: {
        type: Object,
      },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema)
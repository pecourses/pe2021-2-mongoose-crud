const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    body: {
      type: 'string',
      required: true,
      minLength: 5,
    },
    userId: {
      type: mongoose.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

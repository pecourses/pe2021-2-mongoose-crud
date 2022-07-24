const createError = require('http-errors');
const { Post } = require('../models');

module.exports.getPosts = async (req, res, next) => {
  try {
    // links:
    // - https://mongoosejs.com/docs/populate.html
    // - https://mongoosejs.com/docs/api/model.html#model_Model.populate
    // populate работает как левое SQL соединение:
    // слева Post, справа модель, указанная в userId.ref
    const foundPosts = await Post.find().populate('userId');

    res.status(200).send({ data: foundPosts });
  } catch (err) {
    next(err);
  }
};

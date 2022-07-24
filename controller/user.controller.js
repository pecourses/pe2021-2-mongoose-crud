const createHttpError = require('http-errors');
const { default: mongoose } = require('mongoose');
const _ = require('lodash');
const { User, Post } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const newUserInstance = new User(body);
    const createdUser = await newUserInstance.save();
    if (!createdUser) {
      return next(createHttpError(400, 'Bad Request'));
    }
    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.find()
      .limit(5)
      .skip(0);
    if (!foundUsers) {
      return next(createHttpError(400, 'Bad Request'));
    }
    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return next(createHttpError(404, 'NotFound'));
    }
    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      // для возврата обновлкнного значения
      new: true,
      // для применения валидаторов при обновлении
      runValidators: true,
    });

    if (!updatedUser) {
      next(createHttpError(404, 'User Not Found'));
    }
    res.status(200).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.createUserPost = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }
    const newPostInstance = new Post({
      ...body,
      userId: mongoose.Types.ObjectId(userId),
    });
    const createdPost = await newPostInstance.save();
    if (!createdPost) {
      return next(createHttpError(400, 'Bad Request'));
    }

    // Метод инстанса модели toObject() возвращает JS-объект с полезной нагрузкой
    const preparedPost = _.omit(createdPost.toObject(), ['updatedAt']);
    res.status(201).send({ data: preparedPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserPosts = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    // 1
    // const foundUser = await User.findById(userId);
    // if (!foundUser) {
    //   return next(createHttpError(404, 'User Not Found'));
    // }

    // const foundPosts = await Post.find({
    //   userId: mongoose.Types.ObjectId(userId),
    // });

    // if (!foundPosts) {
    //   next(createHttpError(400, 'Bad Request'));
    // }

    // 2
    // aggregate (+ match, lookup, project)
    // работает аналогично aggregate в MongoDB:
    // - match - фильтр,
    // - lookup - соединение с документами другой коллекции по указанным критериям
    // - project - проекция (какие поля полученных документов включать в результат)

    const foundPosts = await User.aggregate()
      .match({ _id: mongoose.Types.ObjectId(userId) })
      .lookup({
        from: 'posts',
        localField: '_id',
        foreignField: 'userId',
        as: 'usersToPosts',
      })
      .project({ usersToPosts: 1, _id: 0 });

    if (!foundPosts.length) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundPosts });
  } catch (err) {
    next(err);
  }
};

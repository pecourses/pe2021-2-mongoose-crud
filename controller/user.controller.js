const createHttpError = require('http-errors');
const { User } = require('./../models');

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

module.exports.createUserPost = async (req, res, next) => {};

module.exports.getUserPosts = async (req, res, next) => {};

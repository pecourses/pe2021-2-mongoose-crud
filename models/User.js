const mongoose = require('mongoose');
const { EMAIL_VALIDATION_SCHEMA } = require('../utils/validationSchemas');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      validate: {
        validator: v => EMAIL_VALIDATION_SCHEMA.isValidSync(v),
      },
    },
    gender: {
      type: 'string',
      enum: ['male', 'female', 'other'],
    },
    birthday: {
      type: 'date',
      max: new Date(),
    },
    isMarried: {
      type: 'boolean',
      default: false,
    },
    workExperience: {
      type: 'number',
      min: 0,
    },
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

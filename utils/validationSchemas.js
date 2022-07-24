const yup = require('yup');

module.exports.EMAIL_VALIDATION_SCHEMA = yup.string().email();

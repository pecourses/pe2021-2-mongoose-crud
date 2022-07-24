const mongoose = require('mongoose');
const env = process.env.NODE_ENV ?? 'development';
const { host, port, dbName } = require('./../configs/mongoDBConfig.json')[env];

mongoose
  .connect(`mongodb://${host}:${port}/${dbName}`)
  .then(() => console.log('Connection Ok'))
  .catch(err => console.log('err', err));

module.exports.User = require('./User');
module.exports.Post = require('./Post');

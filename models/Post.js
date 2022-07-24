const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    body: {
      type: 'string',
      required: true,
      minLength: 5,
    },
    // свойство-опция ref -- ссылка на другую модель
    /* подобно внешнему ключу, но нет проверки ограничений целостности,
       то есть не перпятствует созданию поста для несуществующег юзера
    */
    // используется для метода Post.populate():
    // - find() возвращает посты
    // - populate() возвращает посты со связанными юзерами
    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

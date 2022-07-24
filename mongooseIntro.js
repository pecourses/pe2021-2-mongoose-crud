const mongoose = require('mongoose');

// mongoose
//   .connect('mongodb://localhost:27017/tasks_db')
//   .then(() => console.log('Connection Ok'))
//   .catch(err => console.log('err', err));

const taskSchema = new mongoose.Schema({
  value: 'string',
  userId: mongoose.ObjectId,
});

const Task = mongoose.model('Task', taskSchema);

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tasks_db');

    // C
    // const task1 = new Task({
    //   value: 'Relax1',
    //   userId: '62dc0182402321d60c6bd46a',
    // });

    // const createdTask = await task1.save();
    // console.log('createdTask', createdTask);

    // R
    // const foundTasks = await Task.find();
    // console.log('foundTasks', foundTasks);

    // const foundTask = await Task.findById('62dd461e3f9573486f721d6d');
    // console.log('foundTask', foundTask);

    // U
    // const updatedTask = await Task.findByIdAndUpdate(
    //   '62dd461e3f9573486f721d6d',
    //   { value: 'Go to work1' },
    //   { new: true }
    // );
    // console.log('updatedTask', updatedTask);

    // // D
    // const deletedTask = await Task.findByIdAndDelete(
    //   '62dd461e3f9573486f721d6d'
    // );
    // console.log('deletedTask', deletedTask);
  } catch (err) {
    console.log('err', err);
  }
})();

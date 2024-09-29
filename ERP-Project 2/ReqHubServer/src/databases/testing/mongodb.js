var mongoose = require('mongoose');

var mongodbUrl = 'mongodb://localhost:27017/ADMIN-DB';

const mongodbConn = async function () {
  // try {
  //
  //   await mongoose.connect(mongodbUrl);
  //
  //   console.log(`${mongodbUrl}`);
  // } catch (e) {
  //   console.log('database error', e);
  // }
};

module.exports = { mongodbConn };

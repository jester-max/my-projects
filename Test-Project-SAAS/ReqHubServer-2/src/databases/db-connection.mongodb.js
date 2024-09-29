const mongoose = require('mongoose');
const connectMongodb = async (url) => {
  return await mongoose.createConnection(url);
};

module.exports = {
  connectMongodb,
};

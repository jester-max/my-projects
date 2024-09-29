const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = new mongoose.model('tenant-user-user-manager-user', userSchema);

userSchema.index({ username: 1 });

module.exports = UserModel;

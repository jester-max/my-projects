var User = require('../../models/testing/user');

exports.addUser = async function (req, res) {
  try {
    const { username, email } = req.body;

    const user = new User({
      username,
      email,
    });
    const saveData = await user.save();

    res.json({
      Status: 'SUCCESS',
      data: saveData,
    });
  } catch (err) {
    res.json({
      Status: 'ERROR',
      error: err.message,
    });
  }
};

exports.getUser = async function (req, res) {
  try {
    const findDaya = await User.find().explain('executionStats');

    res.json({
      Status: 'SUCCESS',
      data: findDaya,
      error: null,
    });
  } catch (err) {
    res.json({
      Status: 'ERROR',
      error: err.message,
    });
  }
};

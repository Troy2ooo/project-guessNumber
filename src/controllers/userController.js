const userModel = require('../models/userModel');

exports.getUsers = (req, res) => {
  const users = userModel.getAllUsers();
  res.json(users);
};

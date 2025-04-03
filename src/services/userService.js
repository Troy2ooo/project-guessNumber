const userModel = require('../models/userModel');

function getUsers(req, res) {
  const users = userModel.getAllUsers();
  res.json(users);
};

function getUser(req, res) {
  const user = userModel.getOneUser();
  res.json(user);
};


module.exports = { getUsers, getUser };
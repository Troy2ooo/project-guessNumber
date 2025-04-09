const userModel = require('../models/user-model');

function getAllUsers(req, res) {
  const users = userModel.getUsers();
  res.json(users);
}

function getOneUser(req, res) {
  const userId = req.params.user_id;
  console.log(userId);
  const user = userModel.getUser(userId);
  res.json(user);
}

function createUser(req, res) {
  const user = req.body;

  const newUser = userModel.createUser(user.id, user.user_name);
  console.log({ newUser });
  res.json(newUser);
}

module.exports = { getAllUsers, getOneUser, createUser };

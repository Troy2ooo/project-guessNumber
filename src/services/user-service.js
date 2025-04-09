const userModel = require('../models/user-model');

function getUsers(req, res) {
  const users = userModel.getAllUsers();
  res.json(users);
};

function getUser(req, res) {
  const user = userModel.getOneUser();
  res.json(user);
};

function createUser(req,res) {
  const addUser =  userModel.postCreateUser()
}

module.exports = { getUsers, getUser, createUser };
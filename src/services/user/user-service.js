const userModel = require('../../models/user-model');

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

async function createUser(req, res) {
 
 // объект содержит свойства извлеченные из req.body
  const user = {
    id: req.body.id,
    name: req.body.name,
    mail: req.body.mail,
  } 
  // дергаем функцию из модуля userModel и извлекаем из объекта user 3 параметра id, name, mail.
  // функция создает нового пользователя и сохраняет его в newUser.
  try {
    const newUser = await userModel.createUser(user.id, user.name, user.mail); // await - для ожидания завершения промиса. 
    // приостанавливает выполнение функции createUser до тех пор, пока промис, возвращаемый userModel.createUser, не будет выполнен 
    res.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  } 
}


 


function deleteUser(req,res) {
   const userId = req.params.id;
   const mail = req.params.mail;

   userModel.deleteUserById(userId, mail)
   .then(deletedUser => {
     if (deletedUser) {
       res.json({ message: 'User deleted successfully', user: deletedUser });
     } else {
       res.status(404).json({ message: 'User not found' });
     }
   })
}

module.exports = { getAllUsers, getOneUser, createUser, deleteUser };

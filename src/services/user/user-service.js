const userModel = require('../../models/user-model');

async function getAllUsers(req, res) {
  try {
  const users = await userModel.getUsers();
  res.json(users);
} catch (error) {
  res.status(500).json({ message: 'Error getting all users' })
}
};

async function getOneUser(req, res) {
  const userId = req.params.user_id;
  try {
  console.log(userId);
  const user = await userModel.getUser(userId);
  res.json(user);
  }
  catch (error) {
    res.status(500).json({ message: 'Error getting user', error: error.message });
  } 
};

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



async function deleteUser(req,res) {
   const userId = req.params.id;
   try {
  const deletedUser = await userModel.deleteUserById(userId)
   
     if (deletedUser) {
       res.json({ message: 'User deleted successfully', user: deletedUser });
     } else {
       res.status(404).json({ message: 'User not found' });
     }
   } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
   }
}



// function updateUserName (req,res) {
//   const {userId, newName } = req.body; 
//   userModel.updateUserNamebyId(newName, userId)
//   .then((result) => {
//     if (result) {
//       res.status(200).json({ message: "User name updated", user: result });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   })
//   .catch((err) => {
//     console.error("Error updating user name:", err);
//     res.status(500).json({ message: "Internal server error" });
//   });
// }

async function updateUserName(req, res) {
  try {
  const { userId, newName } = req.body;
  const result = await userModel.updateUserNamebyId(newName, userId);
  
  if (!result) {
  res.status(404).json({ message: 'User not found' });
  }
  
  res.status(200).json({ message: 'User name updated', user: result });
  } 
  catch (error) {
  console.error('Error updating user name:', err);
  res.status(500).json({ message: 'Internal server error' });
    };
  }


async function updateUserMail (req,res) {
  try {
  const { userId, newMail } = req.body;
const result = await userModel.updateUserMailById(newMail, userId);

if (result) {
  res.status(200).json({ message: "User email updated", user: result });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
  catch (err) {
    console.error("Error updating user name:", err);
    res.status(500).json({ message: "Internal server error" });
  };
}






module.exports = { getAllUsers, getOneUser, createUser, deleteUser, updateUserName, updateUserMail };

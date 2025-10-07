
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user-model');


const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;



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
  try {
    const { name, mail, password, role } = req.body;

    if (!name || !mail || !password) {
      return res.status(400).json({ message: 'Name, mail, and password are required' });
    }

    // число “раундов” соли (или “сложность” хэширования).
    // Соль — это случайная добавка к паролю перед хэшированием.
    // Она делает хэш уникальным. 
    const saltRounds = 10;

    // bcrypt генерирует соль (автоматически, исходя из saltRounds).
    // Затем смешивает соль с паролем и создаёт хэш
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Определяем роль (по умолчанию "user")
    let userRole = 'user';

    if (role === 'admin') {
      if (req.user && req.user.role === 'admin') {
        userRole = 'admin'; // админ может создать другого админа
      } else {
        return res.status(403).json({ error: 'Only admins can assign the admin role' });
      }
    }

    const newUser = await userModel.createUser(name, mail, password_hash, userRole);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        mail: newUser.mail,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
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

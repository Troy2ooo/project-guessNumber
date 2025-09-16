const userModel = require('../../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
 
 // объект содержит свойства извлеченные из req.body
  const user = {
    name: req.body.name,
    mail: req.body.mail,
    password_hash: req.body.password_hash,
    role: req.body.role = 'user'
  } 
  // дергаем функцию из модуля userModel и извлекаем из объекта user 3 параметра id, name, mail.
  // функция создает нового пользователя и сохраняет его в newUser.
  try {
    const newUser = await userModel.createUser(user.name, user.mail, user.password_hash, user.role); // await - для ожидания завершения промиса. 
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








// Регистрация
async function registerUser(req, res) {
  try {
    const { userName, email, password, role } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ error: 'username, email and password are required' });
    }


    const existsByName = await userModel.getUserByName(userName);
    if (existsByName) return res.status(400).json({ error: 'username already taken' });

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Создаём пользователя, role по умолчанию 'user'
    const newUser = await userModel.createUser(userName, email, password_hash, role || 'user');

    return res.status(201).json({
      message: 'Регистрация успешна',
      user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    console.error('registerUser error', err);
    if (err.code === '23505') return res.status(400).json({ error: 'User exists' });
    return res.status(500).json({ error: 'Server error' });
  }
}

// Логин
async function loginUser(req, res) {
  try {
    const { userName, password } = req.body; 
    if (!userName || !password) 
    return res.status(400).json({ error: 'username and password are required' });

    // Попробуем найти пользователя по username
    let user = await userModel.getUserByName(userName);
   

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const payLoad = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payLoad, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: 'Вход успешен', token });
  } catch (err) {
    console.error('loginUser error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}


  

async function getProfile(req, res) {
  try {
    const userId = req.user.id; 
    const user = await userModel.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return res.json(profile);
  } catch (err) {
    console.error('getProfile error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
 



module.exports = { getAllUsers, getOneUser, createUser, deleteUser, updateUserName, updateUserMail, registerUser,
 loginUser, getProfile };

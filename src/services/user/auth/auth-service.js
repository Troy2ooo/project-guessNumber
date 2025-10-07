
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../../models/user-model');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;



// Регистрация
async function registerUser(req, res) {
  try {
    const { username, email, password, role } = req.body;

    // Проверка обязательных полей
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email and password are required' });
    }

    // Проверяем, есть ли уже пользователь с таким username
    const existsByName = await userModel.getUserByName(username);
    if (existsByName) 
      return res.status(400).json({ error: 'username already taken' });

    // Генерируем безопасный хэш пароля
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Создаём пользователя, role по умолчанию 'user'
    const newUser = await userModel.createUser(username, email, password_hash, role || 'user');

    return res.status(201).json({
      message: 'Регистрация успешна',
      user: { 
        id: newUser.id, 
        username: newUser.username, 
        email: newUser.email, 
        role: newUser.role }
    });

  } catch (err) {
    console.error('registerUser error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}


// Логин
async function loginUser(req, res) {
  try {
    const { username, password } = req.body; 
    if (!username || !password) 
    return res.status(400).json({ error: 'username and password are required' });

    // Попробуем найти пользователя по username
    let user = await userModel.getUserByName(username);

    if (!user) 
      return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) 
      return res.status(400).json({ error: 'Invalid credentials' });

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
 




module.exports = { registerUser, loginUser, getProfile };
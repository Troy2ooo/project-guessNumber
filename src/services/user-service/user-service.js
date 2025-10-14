/**
 * @module UserService
 * Сервисный модуль для работы с пользователями.
 * 
 * Содержит функции для:
 * - получение всех пользователей,
 * - получение одного пользователя по ID,
 * - создание нового пользователя,
 * - удаление пользователя по ID,
 * - обновление информации пользователя,
 * - обновление электронной почты пользователя.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user-model');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;


/**
 * Получает всех пользователей.
 *
 * @async
 * @function getAllUsers
 * @param {import('express').Request} req - Объект запроса.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с массивом пользователей.
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных.
 */
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    // Метод .map():
    // проходит по каждому элементу массива;
    // применяет к нему функцию, которую ты передаёшь;
    // возвращает новый массив с результатами этой функции.
    const usersData = users.map(user => ({
      id: user.id,
      name: user.username,
      mail: user.email,
      role: user.role
    }));

    res.json({
      message: 'Here we go, all users!',
      usersData
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting all users', error: error.message });
  }
};


/**
 * Получает одного пользователя по ID.
 *
 * @async
 * @function getOneUser
 * @param {import('express').Request} req - Объект запроса, содержит params.id.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными пользователя.
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных.
 */
async function getOneUser(req, res) {
  const userId = req.params.id;
  try {
    console.log(userId);
    const user = await userModel.getUser(userId);
    res.json({ message: 'Here we go user',
      userData: {
        id: user.id,
      name: user.username,
      mail: user.email,
      role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting user', error: error.message });
  }
};


/**
 * Создает нового пользователя.
 *
 * @async
 * @function createUser
 * @param {import('express').Request} req - Объект запроса, содержит body: { name, mail, password, role }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными созданного пользователя.
 * @throws {Error} Если произошла ошибка при создании пользователя или нарушении уникальности.
 */
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
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}


/**
 * Удаляет пользователя по ID.
 *
 * @async
 * @function deleteUser
 * @param {import('express').Request} req - Объект запроса, содержит params.id.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными удаленного пользователя.
 * @throws {Error} Если произошла ошибка при удалении пользователя.
 */
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const deletedUser = await userModel.deleteUser(userId);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully', user: deletedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}


/**
 * Обновляет имя и/или email пользователя.
 *
 * @async
 * @function updateUser
 * @param {import('express').Request} req - Объект запроса, содержит body: { userId, userName, email }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с обновленными данными пользователя.
 * @throws {Error} Если произошла ошибка при обновлении.
 */
//донастроить http
async function updateUser(req, res) {
  try {
    const { userId, userName, email } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    // Создаем объект только с полями, которые пришли
    const fieldsToUpdate = {};
    if (userName) { fieldsToUpdate.name = userName
    };
    if (email) { fieldsToUpdate.email = email
    };
    const result = await userModel.updateUser(userId, fieldsToUpdate);

    if (!result) {
      return res.status(404).json({ message: 'User not found or nothing to update' });
    }
    res.status(200).json({ message: 'User updated successfully', user: result });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


/**
 * Обновляет email пользователя.
 *
 * @async
 * @function updateUserMail
 * @param {import('express').Request} req - Объект запроса, содержит body: { userId, newMail }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с обновленным email пользователя.
 * @throws {Error} Если произошла ошибка при обновлении email.
 */
async function updateUserMail(req, res) {
  try {
    const { userId, newMail } = req.body;
    const result = await userModel.updateUserMailById(newMail, userId);

    if (result) {
      res.status(200).json({ message: 'User email updated', user: result });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user name:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAllUsers, getOneUser, createUser, deleteUser, updateUser, updateUserMail };

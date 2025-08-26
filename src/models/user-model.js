const pool = require('../../db')

// exports.getUsers = () => {
//   return [
//     {
    //   id: 1,
    //   name: 'Ilya',
    // },
    // {
    //   id: 2,
    //   name: 'Lisa',
//     },
//   ];
// };

// доработать

exports.getUser = (userId) => {
  console.log(userId, '<---'); // TODO: add DB logiv
  return [
    {
      id: 1,
      name: 'Ilya',
    },
  ];
};

exports.createUser = async (userId, userName, userMail) => {
  const query = "INSERT INTO users (id, name, mail) values ($1, $2, $3) RETURNING * ";
  const values = [userId, userName, userMail];
  try {
  const result = await pool.query(query, values)
  return result.rows[0]
  } catch (err) {
    console.error('Error executing query', err);
  }
}




exports.deleteUserById = async (userId) => {
  // RETURNING * - какие данные должны быть возвращены после выполнения операции удаления. 
  const query = "DELETE FROM users WHERE id = $1  RETURNING *"; 
  const values = [ userId ]
  try {
  const result = await pool.query(query,  values)
  // благодаря returning *, в логах result будет содержаться объект с удаленной записью 
  console.log({ result })
  return result
  } catch (err) {
  console.error ('Error executing query', err);
  }
};


exports. updateUserNamebyId = async (newName, userId) => {
  const query = "UPDATE users SET name = $1 WHERE id = $2 RETURNING *";
  const values = [newName,userId];
  try { 
    const result = await pool.query(query, values);
    console.log({ result });
    if (result.rowCount === 0) {
      return null; // Возвращаем null, если ни одна строка не была обновлена
    }

    return result.rows[0]; // Возвращаем обновленную строку
  } catch (err) {
    console.error("Error executing query", err);
    throw err; // Перебрасываем ошибку, чтобы обработать ее в вызывающем коде
  }
};

exports. updateUserMailById = async (newMail, userId) => {
  const query = "UPDATE users SET mail = $1 WHERE id = $2 RETURNING *"
  const values = [newMail, userId];
  try {
    const result = await pool.query(query, values);
    console.log ({result});
    if (result.rowsCount === 0) {
      return null;
  }
  return result.rows[0]; 
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
} 

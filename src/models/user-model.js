const pool = require('../../db')

exports.getUsers = () => {
  return [
    {
      id: 1,
      name: 'Ilya',
    },
    {
      id: 2,
      name: 'Lisa',
    },
  ];
};

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

  // return [ 
  //   {
  // id: userId,
  // name: userName,
  // createAt: new Date(),
  //   }
  // ];



exports.deleteUserById = async (delUserId, mail) => {
  // RETURNING * - какие данные должны быть возвращены после выполнения операции удаления. 
  const query = "DELETE FROM users WHERE id = $1 AND mail = $2  RETURNING *";   // 'DELETE FROM users WHERE user_id = 3 RETURNING *'
  const values = [ delUserId, mail ]
  const result = await pool.query(query,  values)
  // благодаря returning *, в логах result будет содержаться объект с удаленной записью
  console.log({ result })
  return result
};



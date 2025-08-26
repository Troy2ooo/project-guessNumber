const pool = require ('../../db')

// exports.getBooks = () => {
//     return [
//         {
//         id: ?
//         }
//     ]

// }

exports.getOneBook = () => {
        return [
            {
            id: 1
            }
        ]
    
    }


exports.createBook = async (bookId, bookTitle, bookDescription, bookAvailable) => {
    const query = "INSERT INTO books (id, title, description, available) values ($1, $2, $3, $4) RETURNING * ";
    const values = [bookId, bookTitle, bookDescription, bookAvailable];
    try {
    const result = await pool.query(query, values)
    console.log({ result })
    return result.rows[0]
    } catch (err) {
      console.error('Error executing query', err);
    }
  }


  exports.deleteBookById = async (bookId) => {
    const query = "DELETE FROM books WHERE id = $1  RETURNING *"; 
    const values = [ bookId ]
    try {
    const result = await pool.query(query,  values)

    console.log({ result })
    return result
    } catch (err) {
    console.error ('Error executing query', err);
    }
  };


const authorsModel = require('../../models/authors-model');


async function getAllAuthors(req, res) {
  try {
    const authors = await authorsModel.getAllAuthors();

    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error getting authors', error: error.message });
  }
}


async function getAuthor(req, res) {
  const authorId = req.params.id;

  try {
    const author = await authorsModel.getOneAuthor(authorId);

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error getting author', error: error.message });
  }
};


async function createAuthor(req, res) {
  const author = {
    name: req.body.name,
    bio: req.body.bio,
  };

  try {
    const newAuthor = await authorsModel.createAuthor(author.name, author.bio);

    res.json({ message: 'Author created successfully', author: newAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error: error.message });
  }
}


async function deleteAuthor (req, res) {
  const authorId = req.params.id;

  const deletedAuthor = await authorsModel.deleteAuthor (authorId);

  if (deleteAuthor) {
    res.json({ message: 'Author deleted successfully', author: deleteAuthor });
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
}

module.exports = { getAllAuthors, getAuthor, createAuthor, deleteAuthor };

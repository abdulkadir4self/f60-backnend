const Book = require('../models/bookSchema');

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author , year , categories } = req.body;
  const book = new Book({ title, author , year , categories  });
  await book.save();
  res.send('Book created');
};

// Get all books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};

// Update a book
// first add year and categories in this feild 
exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author; 
// first add year and categories in this feild 

  
  await book.save();
  res.send('Book updated');
};

// Delete a book (only for admin)
exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  
  await book.remove();
  res.send('Book deleted');
};

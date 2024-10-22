const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const Book = require('./src/models/bookSchema')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const dotenv = require('dotenv').config();

// Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.get('/book-get', async (req, res) => {
    const { author, genres } = req.query;
  
    try {
      // Build query object
      let filter = {};
  
      if (author) {
        filter.author = author;
      }
  
      if (genres) {
        const genreArray = genres.split(','); // Split comma-separated genres
        filter.categorise = { $in: genreArray }; // Filter by genres in the categorise array
      }
  
      // Query to filter and sort
      const books = await Book.find(filter).sort({ year: 1 }); // Sorting by year in ascending order (use -1 for descending)
      
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Book-Mngmnt')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

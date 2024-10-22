const express = require('express');
const { createBook, getAllBooks, updateBook, deleteBook } = require('../controllers/bookCtr');
const authMiddleware = require('../middleware/authMW');
const roleMiddleware = require('../middleware/roleMW');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'editor']), createBook);
router.get('/', authMiddleware, roleMiddleware(['admin', 'editor', 'viewer']), getAllBooks);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'editor']), updateBook);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteBook);

module.exports = router;
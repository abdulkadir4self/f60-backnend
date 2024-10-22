const express = require('express');
const { register, login, promoteRole } = require('../controllers/authCtr');
const authMiddleware = require('../middleware/authMW');
const roleMiddleware = require('../middleware/roleMW');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/promote/:id', authMiddleware, roleMiddleware(['admin']), promoteRole);

module.exports = router;

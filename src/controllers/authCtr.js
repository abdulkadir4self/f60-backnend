const User = require('../models/schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  
  res.send('User registered');
};

// Login user and generate JWT
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid credentials');
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid credentials');
  
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.header('Authorization', token).send({ token });
};

// Promote a user's role
exports.promoteRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');

  if (user.role === 'viewer') {
    user.role = 'editor';
  } else if (user.role === 'editor') {
    user.role = 'admin';
  } else {
    return res.status(400).send('User is already an admin');
  }
  
  await user.save();
  res.send(`User promoted to ${user.role}`);
};

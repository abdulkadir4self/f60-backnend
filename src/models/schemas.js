const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,  },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' },
});

module.exports = mongoose.model('User', userSchema);




 
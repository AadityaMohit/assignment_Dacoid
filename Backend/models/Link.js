const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  userId: String,
  longUrl: String,
  shortCode: String,
  createdAt: { type: Date, default: Date.now },
  expirationDate: Date,
  clicks: { type: Number, default: 0 }
});

module.exports = mongoose.model('Link', linkSchema);

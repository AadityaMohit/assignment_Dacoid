const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  linkId: String,
  clickedAt: { type: Date, default: Date.now },
  ip: String,
  browser: String,
  device: String
});

module.exports = mongoose.model('Click', clickSchema);

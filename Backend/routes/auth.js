const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === 'intern@dacoid.com') {
    const hashed = await bcrypt.hash('Test123', 10);
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, password: hashed });
      await user.save();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, userId: user._id });
  } else {
    res.status(401).json({ message: 'Invalid email' });
  }
});

module.exports = router;

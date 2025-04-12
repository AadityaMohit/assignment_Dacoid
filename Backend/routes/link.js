const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  next();
};

router.post('/create', auth, async (req, res) => {
  const { longUrl, customAlias, expirationDate } = req.body;
  const shortCode = customAlias || Math.random().toString(36).substring(2, 8);
  const newLink = new Link({
    userId: req.userId,
    longUrl,
    shortCode,
    expirationDate
  });
  await newLink.save();
  res.json({ shortUrl: `http://localhost:5000/${shortCode}` });
});

router.get('/all', auth, async (req, res) => {
  const links = await Link.find({ userId: req.userId });
  res.json(links);
});

module.exports = router;

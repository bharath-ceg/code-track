const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to CodeTrack' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.get('/dashboard', protect, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

module.exports = router;

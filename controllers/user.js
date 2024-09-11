const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if both username and email exist in the request
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or Email already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS) || 10);

    // Create the user
    const user = await User.create({ username, email, hashedPassword });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Optional: Token expiration time
    );

    return res.status(201).json({ user: { username: user.username, email: user.email }, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Something went wrong, please try again.' });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user by username
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Check password validity
    const isValidPassword = bcrypt.compareSync(password, existingUser.hashedPassword);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ user: { username: existingUser.username, email: existingUser.email }, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Something went wrong, please try again.' });
  }
});

module.exports = router;

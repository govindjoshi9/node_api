const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [];

app.post('/signup', (req, res) => {
  const { name, email, mobile } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email || user.mobile === mobile);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  // Create new user
  const userId = uuid.v4();
  const accessToken = jwt.sign({ userId }, 'access_token_secret', { expiresIn: '5m' });
  const refreshToken = jwt.sign({ userId }, 'refresh_token_secret');
  users.push({ userId, name, email, mobile, refreshToken });
  
  return res.status(201).json({ userId, accessToken, refreshToken });
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});

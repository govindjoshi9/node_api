const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  { userId: '1', name: 'John Doe', email: 'johndoe@example.com', mobile: '1234567890', password: 'password1', refreshToken: 'refresh_token_1' },
  { userId: '2', name: 'Jane Smith', email: 'janesmith@example.com', mobile: '0987654321', password: 'password2', refreshToken: 'refresh_token_2' }
];

app.post('/login', (req, res) => {
  const { mobile, password } = req.body;
  
  // Find user by mobile and password
  const user = users.find(user => user.mobile === mobile && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid mobile or password' });
  }
  
  // Create tokens
  const accessToken = jwt.sign({ userId: user.userId }, 'access_token_secret', { expiresIn: '5m' });
  const refreshToken = jwt.sign({ userId: user.userId }, 'refresh_token_secret');
  
  // Update user's refresh token
  user.refreshToken = refreshToken;
  
  return res.json({ accessToken, refreshToken });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

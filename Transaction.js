const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transactions = [
  { id: '1', name: 'Transaction 1', imageUrl: 'https://example.com/image1.png', amount: 100, type: 'Debit', currencySymbol: '$' },
  { id: '2', name: 'Transaction 2', imageUrl: 'https://example.com/image2.png', amount: 200, type: 'Credit', currencySymbol: '$' },
  { id: '3', name: 'Transaction 3', imageUrl: 'https://example.com/image3.png', amount: 300, type: 'Debit', currencySymbol: '$' },
  { id: '4', name: 'Transaction 4', imageUrl: 'https://example.com/image4.png', amount: 400, type: 'Credit', currencySymbol: '$' },
  { id: '5', name: 'Transaction 5', imageUrl: 'https://example.com/image5.png', amount: 500, type: 'Debit', currencySymbol: '$' },
  { id: '6', name: 'Transaction 6', imageUrl: 'https://example.com/image6.png', amount: 600, type: 'Credit', currencySymbol: '$' }
];

app.get('/transactions', (req, res) => {
  const { accessToken, limit, transactionId } = req.query;
  
  // Verify access token
  try {
    const decoded = jwt.verify(accessToken, 'access_token_secret');
    const userId = decoded.userId;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid access token' });
  }
  
  // Find index of transaction with given id
  let index = transactions.findIndex(transaction => transaction.id === transactionId);
  if (index === -1) {
    index = 0;
  }
  
  // Get next `limit` transactions starting from index
  const nextTransactions = transactions.slice(index, index + limit);
  
  return res.json(nextTransactions);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


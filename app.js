require('dotenv').config();

const express = require('express');

const databaseMiddleware = require('./middleware/database');

const authRouter = require('./routes/auth');
const transactionRouter = require('./routes/transaction');
const authenticationMiddleware = require('./middleware/authentication');

const app = express();

app.use(express.json());
app.use(databaseMiddleware);

app.get('/', (req, res) => {
  res.send('hello word');
});

app.use('/auth', authRouter);
app.use('/transaction', authenticationMiddleware, transactionRouter);

app.listen(8014, () => {
  console.log('server is running');
});

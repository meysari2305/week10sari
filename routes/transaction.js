const { Router } = require('express');
const { getAllTransaction, createTransaction, transferApproval } = require('../service/transaction-service');
const authorizationMiddleware = require('../middleware/authorization');

const transactionRouter = Router();

transactionRouter.get('/', getAllTransaction);
transactionRouter.post('/', authorizationMiddleware, createTransaction);
transactionRouter.patch('/:id', authorizationMiddleware, transferApproval);

module.exports = transactionRouter;

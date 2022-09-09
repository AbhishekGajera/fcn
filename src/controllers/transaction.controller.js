const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  addTransaction,
    updateTransactionById,
    deleteTransactionById,
    getTransactionUser,
    getTransactionList } = require('../services/transaction.service');
const pick = require('../utils/pick');


const transactionAdd = catchAsync(async (req, res) => {
  const result = await addTransaction(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const transactionUpdate = catchAsync(async (req, res) => {
  const result = await updateTransactionById(req.body.trasaction_id,req.body);
  res.send(result);
});

const transactionDelete = catchAsync(async (req, res) => {
  await deleteTransactionById(req.params.transactionId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getTransaction = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTransactionList(filter, options);
  res.send(result);
});

const getTransactionByUser = catchAsync(async (req, res) => {
  
  const result = await getTransactionUser(req.params.Transid);
  res.send(result);
});

module.exports = {
  transactionAdd,
  transactionUpdate,
  transactionDelete,
  getTransaction,
  getTransactionByUser
};

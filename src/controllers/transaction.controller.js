const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { addTransaction,
  updateTransactionById,
  deleteTransactionById,
  getTransactionUser,
  getTransactionBranch,
  getTransactionList } = require('../services/transaction.service');
const pick = require('../utils/pick');


const transactionAdd = catchAsync(async (req, res) => {
  const result = await addTransaction(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const transactionUpdate = catchAsync(async (req, res) => {
  const result = await updateTransactionById(req.body.trasaction_id, req.body);
  res.send(result);
});

const transactionDelete = catchAsync(async (req, res) => {
  await deleteTransactionById(req.params.transactionId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getTransaction = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'user', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTransactionList(filter, options);
  res.send(result);
});

const getTransactionByUser = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10

  const data = await getTransactionUser(req.params.Transid, page, limit);

  res.send({
    results: data?.results,
    page,
    limit,
    totalPages: Math.ceil(data?.totalCount / limit),
    totalResults: data?.totalCount
  });
});
const getTransactionByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role', 'to_user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTransactionBranch(filter, options);
  res.send(result);
});

module.exports = {
  transactionAdd,
  transactionUpdate,
  transactionDelete,
  getTransaction,
  getTransactionByUser,
  getTransactionByBranch
};

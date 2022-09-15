    const httpStatus = require('http-status');
const Transaction = require('../models/transaction.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a target
 * @param {Object} leaveBody
 * @returns {Promise<Transaction>}
 */
const addTransaction = async (leaveBody) => {
  return Transaction.create(leaveBody);
};


/**
 * Get target by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getTransactionById = async (id) => {
  return Transaction.findById(id);
};


/**
 * Update target by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateTransactionById = async (leaveId, updateBody) => {
  const transaction = await getTransactionById(leaveId);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(transaction, updateBody);
  await transaction.save();
  return transaction;
};



/**
 * Delete target by id
 * @param {ObjectId} transactionId
 * @returns {Promise<Employee>}
 */
 const deleteTransactionById = async (transactionId) => {
  const transactiondata = await getTransactionById(transactionId);
  if (!transactiondata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'transaction not found');
  }
  await transactiondata.remove();
  return transactiondata;
};


/**
 * Get targets
 * @returns {Promise<Employee>}
 */
 const getTransactionList = async (filter,options) => {
 const transaction = await Transaction.paginate(filter, options);
 if (!transaction) {
   throw new ApiError(httpStatus.NOT_FOUND, 'transaction not found');
 }
 return transaction;
};


const getTransactionUser = async (id) => {
  const transaction = await Transaction.find({
    $or: [
      {
        from_user: id ,
      },
      {
        to_user: id ,
      }
    ],
    status : 0
  });
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'transaction not found');
  }
  return transaction;
 };
 
 const getTransactionBranch = async (filter,options) => {
 
  const transaction = await Transaction.paginate(filter, options);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'transaction not found');
  }
  return transaction;
 };


module.exports = {
  addTransaction,
  updateTransactionById,
  deleteTransactionById,
  getTransactionList,
  getTransactionUser,
  getTransactionBranch
};

const httpStatus = require('http-status');
const Cost = require('../models/cost.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a cost
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const approveCost = async (leaveBody) => {
  return Cost.create(leaveBody);
};


/**
 * Get cost by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getCostById = async (id) => {
  return Cost.findById(id);
};


/**
 * Update cost by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateCostById = async (leaveId, updateBody) => {
  const cost = await getCostById(leaveId);
  if (!cost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cost not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(cost, updateBody);
  await cost.save();
  return cost;
};



/**
 * Delete cost by id
 * @param {ObjectId} costId
 * @returns {Promise<Employee>}
 */
 const deleteCostById = async (costId) => {
  const costdata = await getCostById(costId);
  if (!costdata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cost not found');
  }
  await Cost.remove();
  return costdata;
};


/**
 * Get costs
 * @returns {Promise<Employee>}
 */
 const getCostsList = async (filter,options) => {
 const cost = await Cost.paginate(filter, options);
 if (!cost) {
   throw new ApiError(httpStatus.NOT_FOUND, 'cost not found');
 }
 return cost;
};



module.exports = {
  approveCost,
  updateCostById,
  deleteCostById,
  getCostsList
};

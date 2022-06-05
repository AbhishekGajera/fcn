const httpStatus = require('http-status');
const Target = require('../models/target.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a target
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const approveTarget = async (leaveBody) => {
  return Target.create(leaveBody);
};


/**
 * Get target by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getTargetById = async (id) => {
  return Target.findById(id);
};


/**
 * Update target by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateTargetById = async (leaveId, updateBody) => {
  const target = await getTargetById(leaveId);
  if (!target) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Target not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(target, updateBody);
  await target.save();
  return target;
};



/**
 * Delete target by id
 * @param {ObjectId} targetId
 * @returns {Promise<Employee>}
 */
 const deleteTargetById = async (targetId) => {
  const targetdata = await getTargetById(targetId);
  if (!targetdata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'target not found');
  }
  await targetdata.remove();
  return targetdata;
};


/**
 * Get targets
 * @returns {Promise<Employee>}
 */
 const getTargetsList = async (filter,options) => {
 const target = await Target.paginate(filter, options);
 if (!target) {
   throw new ApiError(httpStatus.NOT_FOUND, 'target not found');
 }
 return target;
};



module.exports = {
  approveTarget,
  updateTargetById,
  deleteTargetById,
  getTargetsList
};

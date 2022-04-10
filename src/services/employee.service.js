const httpStatus = require('http-status');
const Salary = require('../models/salary.model');
const Leave = require('../models/leave.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')
/**
 * Create a leave
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const approveLeave = async (leaveBody) => {
  return Leave.create(leaveBody);
};


/**
 * Get leave by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getLeaveById = async (id) => {
  return Leave.findById(id);
};


/**
 * Update leave by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateLeaveById = async (leaveId, updateBody) => {
  const leave = await getLeaveById(leaveId);
  if (!leave) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(leave, updateBody);
  await leave.save();
  return leave;
};



/**
 * Delete leave by id
 * @param {ObjectId} leaveId
 * @returns {Promise<Employee>}
 */
 const deleteLeaveById = async (leaveId) => {
  const leave = await getLeaveById(leaveId);
  if (!leave) {
    throw new ApiError(httpStatus.NOT_FOUND, 'leave not found');
  }
  await leave.remove();
  return leave;
};


/**
 * Get leaves
 * @returns {Promise<Employee>}
 */
 const getLeavesList = async (filter,options) => {
 const leave = await Leave.paginate(filter, options);
 if (!leave) {
   throw new ApiError(httpStatus.NOT_FOUND, 'leave not found');
 }
 return leave;
};



module.exports = {
  approveLeave,
  updateLeaveById,
  deleteLeaveById,
  getLeavesList
};

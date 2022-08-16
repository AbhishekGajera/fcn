const httpStatus = require('http-status');

const Lead = require('../models/lead.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')
/**
 * Create a leave
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const approveLead = async (leaveBody) => {
  return Lead.create(leaveBody);
};


/**
 * Get leave by id
 * @param {ObjectId} id
 * @returns {Promise<Lead>}
 */
 const getLeaveById = async (id) => {
   
  return Lead.findById(id);
};


/**
 * Update leave by id
 * @param {ObjectId} leadId
 * @param {Object} updateBody
 * @returns {Promise<Lead>}
 */
 const updateLeadById = async (leadId, updateBody) => {
    console.log("lead",leadId)
  const lead = await getLeaveById(leadId);
  if (!lead) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found');
  }

//   if(updateBody?.user){
//     const user = await getUserById(updateBody?.user)
//     if(!user){
//       throwf new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     }
//   }

  Object.assign(lead, updateBody);
  await lead.save();
  return lead;
};



/**
 * Delete leave by id
 * @param {ObjectId} leadId
 * @returns {Promise<Lead>}
 */
 const deleteLeadById = async (leadId) => {
   
  const lead = await getLeaveById(leadId);
  if (!lead) {
    throw new ApiError(httpStatus.NOT_FOUND, 'lead not found');
  }
  await lead.remove();
  return lead;
};


/**
 * Get leaves
 * @returns {Promise<Employee>}
 */
 const getLeadList = async (filter,options) => {
 const lead = await Lead.paginate(filter, options);
 if (!lead) {
   throw new ApiError(httpStatus.NOT_FOUND, 'lead not found');
 }
 return lead;
};



module.exports = {
  approveLead,
  updateLeadById,
  deleteLeadById,
  getLeadList
};

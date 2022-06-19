const httpStatus = require('http-status');
const Appoinmnets = require('../models/appoinments.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a appoinments
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const approveAppoinments = async (leaveBody) => {
  return Appoinmnets.create(leaveBody);
};


/**
 * Get appoinments by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getAppoinmnetsById = async (id) => {
  return Appoinmnets.findById(id);
};


/**
 * Update appoinments by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateAppoinmnetsById = async (leaveId, updateBody) => {
  const appoinments = await getAppoinmnetsById(leaveId);
  if (!appoinments) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appoinmnets not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(appoinments, updateBody);
  await appoinments.save();
  return appoinments;
};



/**
 * Delete appoinments by id
 * @param {ObjectId} appoinmentsId
 * @returns {Promise<Employee>}
 */
 const deleteAppoinmnetsById = async (appoinmentsId) => {
  const appoinmentsdata = await getAppoinmnetsById(appoinmentsId);
  if (!appoinmentsdata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'appoinments not found');
  }
  await appoinmentsdata.remove();
  return appoinmentsdata;
};


/**
 * Get appoinmentss
 * @returns {Promise<Employee>}
 */
 const getAppoinmnetssList = async (filter,options) => {
 const appoinments = await Appoinmnets.paginate(filter, options);
 console.log("appoi",appoinments);
 if (!appoinments) {
   throw new ApiError(httpStatus.NOT_FOUND, 'appoinments not found');
 }
 return appoinments;
};



module.exports = {
  approveAppoinments,
  updateAppoinmnetsById,
  deleteAppoinmnetsById,
  getAppoinmnetssList
};

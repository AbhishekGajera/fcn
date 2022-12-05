const httpStatus = require('http-status');
const Powerone = require('../models/powerone.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a powerone
 * @param {Object} poweroneBody
 * @returns {Promise<Powerone>}
 */
const addPowerone = async (poweroneBody) => {
  return Powerone.create(poweroneBody);
};


/**
 * Get powerone by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getPoweroneById = async (id) => {
  return Powerone.findById(id);
};


/**
 * Update powerone by id
 * @param {ObjectId} poweroneId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updatePoweroneById = async (poweroneId, updateBody) => {
  const powerone = await getPoweroneById(poweroneId);
  if (!powerone) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Powerone not found');
  }

  Object.assign(powerone, updateBody);
  await powerone.save();
  return powerone;
};



/**
 * Delete powerone by id
 * @param {ObjectId} poweroneId
 * @returns {Promise<Powerone>}
 */
 const deletePoweroneById = async (poweroneId) => {
  const poweronedata = await getPoweroneById(poweroneId);
  if (!poweronedata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'powerone not found');
  }
  await poweronedata.remove();
  return poweronedata;
};


/**
 * Get powerones
 * @returns {Promise<Powerone>}
 */
 const getPoweroneList = async (filter,options) => {
 const powerone = await Powerone.paginate(filter, options);
 if (!powerone) {
   throw new ApiError(httpStatus.NOT_FOUND, 'powerone not found');
 }
 return powerone;
};


const getPoweroneUser = async (id) => {
  const powerone = await Powerone.find({
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
  if (!powerone) {
    throw new ApiError(httpStatus.NOT_FOUND, 'powerone not found');
  }
  return powerone;
 };
 
 const getPoweroneBranch = async (filter,options) => {
 
  const powerone = await Powerone.paginate(filter, options);
  if (!powerone) {
    throw new ApiError(httpStatus.NOT_FOUND, 'powerone not found');
  }
  return powerone;
 };


module.exports = {
  addPowerone,
  updatePoweroneById,
  deletePoweroneById,
  getPoweroneList,
  getPoweroneUser,
  getPoweroneBranch,
  getPoweroneById
};

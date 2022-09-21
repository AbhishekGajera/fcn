const httpStatus = require('http-status');
const Travel = require('../models/travel.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a travel
 * @param {Object} travelBody
 * @returns {Promise<Travel>}
 */
const addTravel = async (travelBody) => {
  return Travel.create(travelBody);
};


/**
 * Get travel by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getTravelById = async (id) => {
  return Travel.findById(id);
};


/**
 * Update travel by id
 * @param {ObjectId} travelId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateTravelById = async (travelId, updateBody) => {
  const travel = await getTravelById(travelId);
  if (!travel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Travel not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(travel, updateBody);
  await travel.save();
  return travel;
};



/**
 * Delete travel by id
 * @param {ObjectId} travelId
 * @returns {Promise<Travel>}
 */
 const deleteTravelById = async (travelId) => {
  const traveldata = await getTravelById(travelId);
  if (!traveldata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'travel not found');
  }
  await traveldata.remove();
  return traveldata;
};


/**
 * Get travels
 * @returns {Promise<Travel>}
 */
 const getTravelList = async (filter,options) => {
 const travel = await Travel.paginate(filter, options);
 if (!travel) {
   throw new ApiError(httpStatus.NOT_FOUND, 'travel not found');
 }
 return travel;
};


const getTravelUser = async (id) => {
  const travel = await Travel.find({
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
  if (!travel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'travel not found');
  }
  return travel;
 };
 
 const getTravelBranch = async (filter,options) => {
 
  const travel = await Travel.paginate(filter, options);
  if (!travel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'travel not found');
  }
  return travel;
 };


module.exports = {
  addTravel,
  updateTravelById,
  deleteTravelById,
  getTravelList,
  getTravelUser,
  getTravelBranch
};

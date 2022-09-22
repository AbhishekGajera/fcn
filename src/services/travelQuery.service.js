const httpStatus = require('http-status');
const TravelQuery = require('../models/travelQuery.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a travelQuery
 * @param {Object} travelQueryBody
 * @returns {Promise<TravelQuery>}
 */
const addTravelQuery = async (travelQueryBody) => {
  return TravelQuery.create(travelQueryBody);
};


/**
 * Get travelQuery by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getTravelQueryById = async (id) => {
  return TravelQuery.findById(id);
};


/**
 * Update travelQuery by id
 * @param {ObjectId} travelQueryId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateTravelQueryById = async (travelQueryId, updateBody) => {
  const travelQuery = await getTravelQueryById(travelQueryId);
  if (!travelQuery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TravelQuery not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(travelQuery, updateBody);
  await travelQuery.save();
  return travelQuery;
};



/**
 * Delete travelQuery by id
 * @param {ObjectId} travelQueryId
 * @returns {Promise<TravelQuery>}
 */
 const deleteTravelQueryById = async (travelQueryId) => {
  const travelQuerydata = await getTravelQueryById(travelQueryId);
  if (!travelQuerydata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'travelQuery not found');
  }
  await travelQuerydata.remove();
  return travelQuerydata;
};


/**
 * Get travelQuerys
 * @returns {Promise<TravelQuery>}
 */
 const getTravelQueryList = async (filter,options) => {
 const travelQuery = await TravelQuery.paginate(filter, options);
 if (!travelQuery) {
   throw new ApiError(httpStatus.NOT_FOUND, 'travelQuery not found');
 }
 return travelQuery;
};


const getTravelQueryUser = async (id) => {
  const travelQuery = await TravelQuery.find({
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
  if (!travelQuery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'travelQuery not found');
  }
  return travelQuery;
 };
 
 const getTravelQueryBranch = async (filter,options) => {
 
  const travelQuery = await TravelQuery.paginate(filter, options);
  if (!travelQuery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'travelQuery not found');
  }
  return travelQuery;
 };


module.exports = {
  addTravelQuery,
  updateTravelQueryById,
  deleteTravelQueryById,
  getTravelQueryList,
  getTravelQueryUser,
  getTravelQueryBranch
};

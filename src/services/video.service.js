const httpStatus = require('http-status');
const Video = require('../models/video.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a product
 * @param {Object} leaveBody
 * @returns {Promise<Video>}
 */
const addVideo = async (leaveBody) => {
  return Video.create(leaveBody);
};


/**
 * Get video by id
 * @param {ObjectId} id
 * @returns {Promise<Video>}
 */
 const getVideoById = async (id) => {
  return Video.findById(id);
};


/**
 * Update product by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
 const updateVideoById = async (leaveId, updateBody) => {
  console.log("ud",updateBody)
  const video = await getVideoById(updateBody.productId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(video, updateBody);
  await video.save();
  return video;
};



/**
 * Delete product by id
 * @param {ObjectId} videoId
 * @returns {Promise<Employee>}
 */
 const deleteVideoById = async (videoId) => {
  const videodata = await getVideoById(videoId);
  if (!videodata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'video not found');
  }
  await videodata.remove();
  return videodata;
};


/**
 * Get products
 * @returns {Promise<Employee>}
 */
 const getVideoList = async (filter,options) => {
 const video = await Video.paginate(filter, options);
 if (!video) {
   throw new ApiError(httpStatus.NOT_FOUND, 'video not found');
 }
 return video;
};



module.exports = {
    addVideo,
  updateVideoById,
  deleteVideoById,
  getVideoList
};

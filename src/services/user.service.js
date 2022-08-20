const httpStatus = require('http-status');
const { User ,Product } = require('../models');
const ApiError = require('../utils/ApiError');
const  { sendNewPasswordEmail,sendEmailWelcome } = require('./email.service')

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody,userId) => {
  if ( await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const productDetail = await Product.findById(userBody?.product)

  console.info("minAmount++ ",userBody.minAmount)
  console.info("productDetail++ ",productDetail.commision)
  const commision = ((+userBody.minAmount || 0) * (+productDetail.commision || 0)) /  100;
  const ibo = await User.findById(userId);
  ibo.total_earning = (ibo.total_earning || 0) + commision; 
  ibo.save();

  const products = [{
    product : userBody.product,
    minAmount : userBody.minAmount,
    maxAmount : userBody.maxAmount
  }]

  // const user = await User.findById(req.query.user)
  // if(!user?.products) {
  //   user.products = []
  // }

  // user.products.push({
  //   product : userBody.product,
  //   minAmount : userBody.minAmount,
  //   maxAmount : userBody.maxAmount
  // })

  // user.save()


  userBody.products = products


  // await sendEmailWelcome(userBody.email,userBody.name)

  // if (await User.isUserNameTaken(userBody.first_name)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'UserName already taken');
  // }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const productDetail = await Product.findById(updateBody?.product)

  console.info("minAmount++ ",updateBody.minAmount)
  console.info("productDetail++ ",productDetail.commision)
  const commision = ((+updateBody.minAmount || 0) * (+productDetail.commision || 0)) /  100;
  const ibo = await User.findById(userId);
  ibo.total_earning = (ibo.total_earning || 0) + commision; 
  ibo.save();

  const products = [{
    product : updateBody.product,
    minAmount : updateBody.minAmount,
    maxAmount : updateBody.maxAmount
  }]
  updateBody.products = products
  Object.assign(user, updateBody);
  await user.save();
  
  if(updateBody.hasOwnProperty('password')){
    await sendNewPasswordEmail(user.email,user.email,updateBody.password)
  }
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};

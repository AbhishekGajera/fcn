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
  console.log("ud",userBody)
  userBody.name = userBody.first_name +' '+ userBody.last_name;
  if ( await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const productDetail = await Product.findById(userBody?.product)
  let commision = 0;
  if(productDetail){
    commision = ((+userBody.minAmount || 0) * (+productDetail.commision || 0)) /  100;
  }
  
  let Id = userId
  if(userBody?.IBO){
    Id = userBody?.IBO  
  }
  const ibo = await User.findById(Id);
  if(ibo){
    
    if(!ibo?.total_earning) {
      ibo.total_earning = 0
    }
    ibo.total_earning = (ibo?.total_earning || 0) + commision; 
    ibo.save();
  }


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


try {
  await sendEmailWelcome(userBody.email,userBody.name)
} catch (error) {
  console.info(error)
}
  
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
  
  Object.assign(user, updateBody);
  await user.save();
  
  if(updateBody.hasOwnProperty('password')){
    await sendNewPasswordEmail(user.email,user.email,updateBody.password)
  }
  return user;
};

const updateProductAssign = async (userId, updateBody,UId) => {
  const user = await getUserById(userId);

  let Id = UId;
  if(user?.IBO) {
    Id = user?.IBO
  }

  const reqUser = await getUserById(UId)
 
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

   

  const productDetail = await Product.findById(updateBody?.product)
  

  
  const commision = ((+updateBody.minAmount || 0) * (+productDetail.commision || 0)) /  100;
  reqUser.total_earning = (reqUser.total_earning || 0) + commision; 
  console.log("ttl",reqUser.total_earning)
  reqUser.save()
  
  user.products.push(
    {
      product : updateBody.product,
    minAmount : updateBody.minAmount,
    maxAmount : updateBody.maxAmount
    }
  )

  

  // const products = [{
  //   product : updateBody.product,
  //   minAmount : updateBody.minAmount,
  //   maxAmount : updateBody.maxAmount
  // }]
  // updateBody.products = products
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
  updateProductAssign
};

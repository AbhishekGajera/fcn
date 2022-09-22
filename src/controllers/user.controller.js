const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ObjectId = require('mongoose').Types.ObjectId; 

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body,req.user.id);
  console.info(req.user.id)
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','custom','branch','IBO','email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  if(filter?.IBO){
    filter.IBO = new ObjectId(filter.IBO)
  }

  const result = await userService.queryUsers(filter, options);
  res.send(result);
});
const getUsersPowerone = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','custom','branch','IBO','email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsersPowerone();
  res.send(result);
});

const getUsersSIP = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','custom','branch','IBO','email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsersSIP();
  res.send(result);
});
const getUsersByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','custom','branch','IBO','email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUsersByIbo = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.getUserByIbos(req.params.id);
  res.send(result);
});
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});
const getProductClient = catchAsync(async (req, res) => {
  const user = await userService.getProductById(req.params.clientId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});


const getTotalInvest = catchAsync(async (req, res) => {
  const user = await userService.getTotalById(req.params.usrId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});


const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const productAssign = catchAsync(async (req, res) => {
  const user = await userService.updateProductAssign(req.body.userId, req.body,req.user.id);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUsersPowerone,
  getUsersByBranch,
  getUsersByIbo,
  getProductClient,
  getTotalInvest,
  getUser,
  updateUser,
  deleteUser,
  productAssign,
  getUsersSIP
};

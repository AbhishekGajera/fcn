const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { passportService } = require('../services');

const createPassport = catchAsync(async (req, res) => {
  const user = await passportService.createPassport(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getPassports = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','custom','code','name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  const result = await passportService.queryPassports(filter, options);
  res.send(result);
});

const getPassport = catchAsync(async (req, res) => {
  const user = await passportService.getPassportById(req.params.eventId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Passport not found');
  }
  res.send(user);
});

const updatePassport = catchAsync(async (req, res) => {
  const user = await passportService.updatePassportById(req.params.eventId, req.body);
  res.send(user);
});

const deletePassport = catchAsync(async (req, res) => {
  await passportService.deletePassportById(req.params.eventId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPassport,
  getPassports,
  getPassport,
  updatePassport,
  deletePassport,
};

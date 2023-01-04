const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { visaService } = require('../services');

const createVisa = catchAsync(async (req, res) => {
  const user = await visaService.createVisa(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getVisas = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','custom','code','name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  const result = await visaService.queryVisas(filter, options);
  res.send(result);
});

const getVisa = catchAsync(async (req, res) => {
  const user = await visaService.getVisaById(req.params.visaId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Visa not found');
  }
  res.send(user);
});

const updateVisa = catchAsync(async (req, res) => {
  const user = await visaService.updateVisaById(req.params.visaId, req.body);
  res.send(user);
});

const deleteVisa = catchAsync(async (req, res) => {
  await visaService.deleteVisaById(req.params.visaId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createVisa,
  getVisas,
  getVisa,
  updateVisa,
  deleteVisa,
};

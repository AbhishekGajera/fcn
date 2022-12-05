const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  addPowerone,
    updatePoweroneById,
    deletePoweroneById,
    getPoweroneById,
    getPoweroneBranch,
    getPoweroneList } = require('../services/powerone.service');
const pick = require('../utils/pick');


const poweroneAdd = catchAsync(async (req, res) => {
  const result = await addPowerone(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const poweroneUpdate = catchAsync(async (req, res) => {
  const result = await updatePoweroneById(req.params.id,req.body);
  res.send(result);
});

const poweroneDelete = catchAsync(async (req, res) => {
  await deletePoweroneById(req.params.poweroneId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getPowerone = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user','type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getPoweroneList(filter, options);
  res.send(result);
});

const getPoweroneByUser = catchAsync(async (req, res) => {
  const result = await getPoweroneById(req.params.id);
  res.send(result);
});
const getPoweroneByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role','to_user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getPoweroneBranch(filter,options);
  res.send(result);
});

module.exports = {
  poweroneAdd,
  poweroneUpdate,
  poweroneDelete,
  getPowerone,
  getPoweroneByUser,
  getPoweroneByBranch
};

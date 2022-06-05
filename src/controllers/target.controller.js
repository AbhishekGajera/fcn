const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveTarget, updateTargetById, deleteTargetById, getTargetsList } = require('../services/target.service');
const pick = require('../utils/pick');


const targetApprove = catchAsync(async (req, res) => {
  const result = await approveTarget(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const targetUpdate = catchAsync(async (req, res) => {
  const result = await updateTargetById(req.body.target_id,req.body);
  res.send(result);
});

const targetDelete = catchAsync(async (req, res) => {
  await deleteTargetById(req.params.target_id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getTargets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTargetsList(filter, options);
  res.send(result);
});

module.exports = {
  targetApprove,
  targetUpdate,
  targetDelete,
  getTargets
};

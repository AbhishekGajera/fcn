const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveAppoinment, updateAppoinmentById, deleteAppoinmentById, getAppoinmentsList } = require('../services/appoinments.service');
const pick = require('../utils/pick');


const appoinmentsApprove = catchAsync(async (req, res) => {
  const result = await approveAppoinment(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const appoinmentsUpdate = catchAsync(async (req, res) => {
  const result = await updateAppoinmentById(req.body.appoinments_id,req.body);
  res.send(result);
});

const appoinmentsDelete = catchAsync(async (req, res) => {
  await deleteAppoinmentById(req.params.appoinmentsId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAppoinments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getAppoinmentsList(filter, options);
  res.send(result);
});

module.exports = {
  appoinmentsApprove,
  appoinmentsUpdate,
  appoinmentsDelete,
  getAppoinments
};

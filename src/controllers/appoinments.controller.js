const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveAppoinments, updateAppoinmnetsById, deleteAppoinmnetsById, getAppoinmnetssList } = require('../services/appoinments.service');
const pick = require('../utils/pick');


const appoinmentsApprove = catchAsync(async (req, res) => {
  const result = await approveAppoinments(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const appoinmentsUpdate = catchAsync(async (req, res) => {
  console.log("req",req.body)
  const result = await updateAppoinmnetsById(req.body.appoinmentId,req.body);
  console.log("rs",result)
  res.send(result);
});

const appoinmentsDelete = catchAsync(async (req, res) => {
  await deleteAppoinmnetsById(req.params.appoinmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAppoinments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getAppoinmnetssList(filter, options);
  res.send(result);
});

module.exports = {
  appoinmentsApprove,
  appoinmentsUpdate,
  appoinmentsDelete,
  getAppoinments
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  approveLead,
    updateLeadById,
    deleteLeadById,
    getLeadList } = require('../services/lead.service');
const pick = require('../utils/pick');


const leadAdd = catchAsync(async (req, res) => {
  
  const result = await approveLead(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const leadUpdate = catchAsync(async (req, res) => {
  const result = await updateLeadById(req.body.lead_id,req.body);
  res.send(result);
});

const leadDelete = catchAsync(async (req, res) => {
  
  await deleteLeadById(req.params.leadId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getLeads = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','branch']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getLeadList(filter, options);
  res.send(result);
});

module.exports = {
  leadAdd,
  leadUpdate,
  leadDelete,
  getLeads
};

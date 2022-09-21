const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  addTravelQuery,
    updateTravelQueryById,
    deleteTravelQueryById,
    getTravelQueryUser,
    getTravelQueryBranch,
    getTravelQueryList } = require('../services/travelQuery.service');
const pick = require('../utils/pick');


const travelQueryAdd = catchAsync(async (req, res) => {
  const result = await addTravelQuery(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const travelQueryUpdate = catchAsync(async (req, res) => {
  const result = await updateTravelQueryById(req.body.trasaction_id,req.body);
  res.send(result);
});

const travelQueryDelete = catchAsync(async (req, res) => {
  await deleteTravelQueryById(req.params.travelQueryId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getTravelQuery = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user','status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTravelQueryList(filter, options);
  res.send(result);
});

const getTravelQueryByUser = catchAsync(async (req, res) => {
  
  const result = await getTravelQueryUser(req.params.Transid);
  res.send({ results : result  });
});
const getTravelQueryByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role','to_user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTravelQueryBranch(filter,options);
  res.send(result);
});

module.exports = {
  travelQueryAdd,
  travelQueryUpdate,
  travelQueryDelete,
  getTravelQuery,
  getTravelQueryByUser,
  getTravelQueryByBranch
};

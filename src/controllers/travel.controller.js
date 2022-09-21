const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  addTravel,
    updateTravelById,
    deleteTravelById,
    getTravelUser,
    getTravelBranch,
    getTravelList } = require('../services/travel.service');
const pick = require('../utils/pick');


const travelAdd = catchAsync(async (req, res) => {
  const result = await addTravel(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const travelUpdate = catchAsync(async (req, res) => {
  const result = await updateTravelById(req.body.trasaction_id,req.body);
  res.send(result);
});

const travelDelete = catchAsync(async (req, res) => {
  await deleteTravelById(req.params.travelId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getTravel = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user','type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTravelList(filter, options);
  res.send(result);
});

const getTravelByUser = catchAsync(async (req, res) => {
  
  const result = await getTravelUser(req.params.Transid);
  res.send({ results : result  });
});
const getTravelByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role','to_user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getTravelBranch(filter,options);
  res.send(result);
});

module.exports = {
  travelAdd,
  travelUpdate,
  travelDelete,
  getTravel,
  getTravelByUser,
  getTravelByBranch
};

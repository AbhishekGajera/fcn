const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { addRevenue,
    getRevenueList  } = require('../services/revenues.service');
const pick = require('../utils/pick');


const revenueAdd = catchAsync(async (req, res) => {
  const result = await addRevenue(req.body);
  res.status(httpStatus.CREATED).send(result);
});



const getRevenue = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user','custom']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getRevenueList(filter, options);
  res.send(result);
});

module.exports = {
    revenueAdd,
    getRevenue
};


const httpStatus = require('http-status');
const Revenue = require('../models/revenue.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a contact
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const addRevenue = async (leaveBody) => {
  return Revenue.create(leaveBody);
};



/**
 * Get Contacts
 * @returns {Promise<Employee>}
 */
 const getRevenueList = async (filter,options) => {
 const revenue = await Revenue.paginate(filter, options);
 if (!revenue) {
   throw new ApiError(httpStatus.NOT_FOUND, 'revenue not found');
 }
 return revenue;
};



module.exports = {
    addRevenue,
    getRevenueList
};

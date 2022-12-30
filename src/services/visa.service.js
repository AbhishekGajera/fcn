const httpStatus = require('http-status');
const { Visa } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a visa
 * @param {Object} visaBody
 * @returns {Promise<Visa>}
 */
const createVisa = async (visaBody) => {
  if (await getVisaByName(visaBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Visa.create(visaBody);
};

/**
 * Query for cources
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryVisas = async (filter, options) => {
  const cources = await Visa.paginate(filter, options);
  return cources;
};

/**
 * Get visa by id
 * @param {ObjectId} id
 * @returns {Promise<Visa>}
 */
const getVisaById = async (id) => {
  return Visa.findById(id);
};

/**
 * Get visa by email
 * @param {string} email
 * @returns {Promise<Visa>}
 */
const getVisaByEmail = async (email) => {
  return Visa.findOne({ email });
};

/**
 * Get visa by name
 * @param {string} name
 * @returns {Promise<Visa>}
 */
 const getVisaByName = async (name) => {
  return Visa.findOne({ name });
};

/**
 * Update visa by id
 * @param {ObjectId} visaId
 * @param {Object} updateBody
 * @returns {Promise<Visa>}
 */
const updateVisaById = async (visaId, updateBody) => {
  const visa = await getVisaById(visaId);
  if (!visa) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Visa not found');
  }
  if (updateBody.email && (await Visa.isEmailTaken(updateBody.email, visaId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(visa, updateBody);
  await visa.save();
  return visa;
};

/**
 * Delete visa by id
 * @param {ObjectId} visaId
 * @returns {Promise<Visa>}
 */
const deleteVisaById = async (visaId) => {
  const visa = await getVisaById(visaId);
  if (!visa) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Visa not found');
  }
  await visa.remove();
  return visa;
};

module.exports = {
  createVisa,
  queryVisas,
  getVisaById,
  getVisaByEmail,
  updateVisaById,
  deleteVisaById,
};

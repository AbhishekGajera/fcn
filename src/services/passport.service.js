const httpStatus = require('http-status');
const { Passport } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a passport
 * @param {Object} passportBody
 * @returns {Promise<Passport>}
 */
const createPassport = async (passportBody) => {
  if (await getPassportByName(passportBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Passport.create(passportBody);
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
const queryPassports = async (filter, options) => {
  const cources = await Passport.paginate(filter, options);
  return cources;
};

/**
 * Get passport by id
 * @param {ObjectId} id
 * @returns {Promise<Passport>}
 */
const getPassportById = async (id) => {
  return Passport.findById(id);
};

/**
 * Get passport by email
 * @param {string} email
 * @returns {Promise<Passport>}
 */
const getPassportByEmail = async (email) => {
  return Passport.findOne({ email });
};

/**
 * Get passport by name
 * @param {string} name
 * @returns {Promise<Passport>}
 */
 const getPassportByName = async (name) => {
  return Passport.findOne({ name });
};

/**
 * Update passport by id
 * @param {ObjectId} passportId
 * @param {Object} updateBody
 * @returns {Promise<Passport>}
 */
const updatePassportById = async (passportId, updateBody) => {
  const passport = await getPassportById(passportId);
  if (!passport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Passport not found');
  }
  if (updateBody.email && (await Passport.isEmailTaken(updateBody.email, passportId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(passport, updateBody);
  await passport.save();
  return passport;
};

/**
 * Delete passport by id
 * @param {ObjectId} passportId
 * @returns {Promise<Passport>}
 */
const deletePassportById = async (passportId) => {
  const passport = await getPassportById(passportId);
  if (!passport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Passport not found');
  }
  await passport.remove();
  return passport;
};

module.exports = {
  createPassport,
  queryPassports,
  getPassportById,
  getPassportByEmail,
  updatePassportById,
  deletePassportById,
};

const httpStatus = require('http-status');
const Contact = require('../models/contact.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a contact
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const addContact = async (leaveBody) => {
  return Contact.create(leaveBody);
};



/**
 * Get Contacts
 * @returns {Promise<Employee>}
 */
 const getContactList = async (filter,options) => {
 const contact = await Contact.paginate(filter, options);
 if (!contact) {
   throw new ApiError(httpStatus.NOT_FOUND, 'contact not found');
 }
 return contact;
};



module.exports = {
    addContact,
  getContactList
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { addContact,
    getContactList  } = require('../services/contacts.service');
const pick = require('../utils/pick');


const contactAdd = catchAsync(async (req, res) => {
  const result = await addContact(req.body);
  res.status(httpStatus.CREATED).send(result);
});



const getContacts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','user','custom']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getContactList(filter, options);
  res.send(result);
});

module.exports = {
    contactAdd,
    getContacts
};


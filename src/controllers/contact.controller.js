const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { addContact,
    getContactList,getConnectedById , deleteContactById  } = require('../services/contacts.service');
const pick = require('../utils/pick');


const contactAdd = catchAsync(async (req, res) => {
  const result = await addContact(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getConnectId = catchAsync(async (req, res) => {
  const result = await getConnectedById(req.params.id);
  res.send(result);
  
});

const contactDelete = catchAsync(async (req, res) => {
  await deleteContactById(req.params.contactId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getContacts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role','branch','custom']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getContactList(filter, options);
  res.send(result);
});

module.exports = {
    contactAdd,
    getContacts,
    getConnectId,
    contactDelete
};


const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deletePassport = {
  params: Joi.object().keys({
    passportId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  deletePassport
};

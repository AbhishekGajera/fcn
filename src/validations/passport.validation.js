const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deletePassport = {
  params: Joi.object().keys({
    targetId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  deletePassport
};

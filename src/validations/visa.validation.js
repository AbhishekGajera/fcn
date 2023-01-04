const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteVisa = {
  params: Joi.object().keys({
    visaId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  deleteVisa
};

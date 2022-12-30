const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteVisa = {
  params: Joi.object().keys({
    targetId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  deleteVisa
};

const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteAppoinmnets = {
  params: Joi.object().keys({
    appoinmentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  deleteAppoinmnets
};

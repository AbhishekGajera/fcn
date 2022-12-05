const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deletePowerone = {
  params: Joi.object().keys({
    travelId: Joi.string().custom(objectId),
  }),
};

module.exports = {
    deletePowerone
};

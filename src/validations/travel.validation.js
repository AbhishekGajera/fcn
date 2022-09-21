const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteTravel = {
  params: Joi.object().keys({
    travelId: Joi.string().custom(objectId),
  }),
};

module.exports = {
    deleteTravel
};

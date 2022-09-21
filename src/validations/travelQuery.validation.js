const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteTravelQuery = {
  params: Joi.object().keys({
    travelQueryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
    deleteTravelQuery
};

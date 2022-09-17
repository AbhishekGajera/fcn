const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addCost = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    totalCost: Joi.number().required(),
    category: Joi.string(),
    description: Joi.string(),
    image: Joi.allow(),
    type: Joi.string()
  }),
};

const deleteCost = {
  params: Joi.object().keys({
    costId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addCost,
  deleteCost
};

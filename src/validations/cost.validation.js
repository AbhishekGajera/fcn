const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addCost = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    totalCost: Joi.number().required(),
    category: Joi.string().required(),
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

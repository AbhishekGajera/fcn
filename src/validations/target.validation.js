const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addTarget = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    totalTarget: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string(),
    image: Joi.allow(),
    type: Joi.string()
  }),
};

const deleteTarget = {
  params: Joi.object().keys({
    costId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addTarget,
  deleteTarget
};

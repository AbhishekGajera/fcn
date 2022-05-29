const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addProduct = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    category: Joi.string().required(),
    description: Joi.string(),
    image: Joi.allow(),
    name: Joi.string().required()
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addProduct,
  deleteProduct
};

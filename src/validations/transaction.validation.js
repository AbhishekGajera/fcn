const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
    deleteTransaction
};

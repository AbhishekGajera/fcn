const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteNotification = {
  params: Joi.object().keys({
    notification: Joi.string().custom(objectId),
  }),
};

module.exports = {
    deleteNotification
};

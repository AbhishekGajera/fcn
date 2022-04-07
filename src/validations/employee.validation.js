const Joi = require('joi');
const { objectId } = require('./custom.validation');

const approveLeave = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    reason: Joi.string().required(),
    total_leave: Joi.number().required(),
    date_from: Joi.string().required(),
    date_to: Joi.string().required(),
    leave_status: Joi.string().valid('pending', 'approved', 'rejected').required(),
  }),
};

const updateLeave = {
  body: Joi.object().keys({
    leave_id: Joi.string().required().custom(objectId),
    user: Joi.string().optional().custom(objectId),
    reason: Joi.string().optional(),
    total_leave: Joi.number().optional(),
    date_from: Joi.string().optional(),
    date_to: Joi.string().optional(),
    leave_status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
  }),
};

const deleteLeave = {
  params: Joi.object().keys({
    leave_id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  approveLeave,
  updateLeave,
  deleteLeave,
};

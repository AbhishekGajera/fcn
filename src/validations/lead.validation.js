const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addLead = {
  body: Joi.object().keys({
    name:Joi.string().required(), 
    title: Joi.string().required(),
    branch : Joi.string(),
    contactno: Joi.number(),
    email: Joi.string().required().email(),
  }),
};

const updateLead = {
  body: Joi.object().keys({
    lead_id: Joi.string().required().custom(objectId),
    name:Joi.string().required(), 
    title: Joi.string().optional(),
    branch: Joi.string().optional(),
    email: Joi.string().email(),
    contactno: Joi.number(),
    status: Joi.number(),
  }),
};

const deleteLead = {
  params: Joi.object().keys({
    leave_id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  addLead,
  updateLead,
  deleteLead,
};

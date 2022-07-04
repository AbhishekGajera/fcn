const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    dob: Joi.string().required(),
    contactno: Joi.string().required(),
    country: Joi.string().required(),
    bankIfscCode: Joi.string().uppercase({ force: true }),
    address: Joi.string(),
    bankAccNo: Joi.string(),
    branch : Joi.string(),
    ibo: Joi.string(),
    role: Joi.string().valid('user', 'admin','IBO','branch'),
  }), 
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string().allow('',null),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    custom: Joi.string(),
    branch: Joi.string().allow('',null),
    IBO: Joi.string().allow('',null),
    email: Joi.string()
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      dob: Joi.string(),
      contactno: Joi.string(),
      country: Joi.string(),
      bankIfscCode: Joi.string(),
      address: Joi.string(),
      bankAccNo: Joi.string(),
      branch : Joi.string(),
      IBO: Joi.string(),
      role: Joi.string().valid('user', 'admin','IBO','branch'),
      status: Joi.number(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

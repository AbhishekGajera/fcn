const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().allow(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    image: Joi.allow(),
    avatar: Joi.allow(),

    dob: Joi.string().required(),
    contactno: Joi.string().required(),
    country: Joi.string(),
    selectProduct : Joi.string(),
    bankIfscCode: Joi.string().uppercase({ force: true }),
    address: Joi.string(),
    bankAccNo: Joi.string(),
    branch : Joi.string(),
    product : Joi.string(),
    minAmount : Joi.number(),
    maxAmount : Joi.number(),
    total_earning : Joi.number(), 
    product : Joi.string(),
    IBO: Joi.string(),
    role: Joi.string().valid('user', 'admin','IBO','branch'),
    aadhar_card_no: Joi.string(),
    pan_card_no: Joi.string(),
    b_head_name : Joi.string(),
    b_head_contact_no : Joi.string(),
    b_aadhar_card_no : Joi.string(),
    b_pan_card_no : Joi.string(),
    self_declaration : Joi.string()
 
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
    email: Joi.string(),
    minAmount : Joi.number(),
    maxAmount : Joi.number(),
    total_earning : Joi.number(), 
    product : Joi.string(),

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
      name: Joi.string().allow(),
      dob: Joi.string(),
      contactno: Joi.string(),
      country: Joi.string(),
      bankIfscCode: Joi.string(),
      address: Joi.string(),
      bankAccNo: Joi.string(),
      branch : Joi.string(),
      selectProduct : Joi.string(),
      product : Joi.string(),
    minAmount : Joi.number(),
    maxAmount : Joi.number(),
    total_earning : Joi.number(), 
      IBO: Joi.string(),
      role: Joi.string().valid('user', 'admin','IBO','branch'),
      status: Joi.number(),
      aadhar_card_no: Joi.string(),
      pan_card_no: Joi.string(),
      branch_head : {
        name : Joi.string(),
        contact_no : Joi.string(),
        aadhar_card_no : Joi.string(),
        pan_card_no : Joi.string()
      }
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

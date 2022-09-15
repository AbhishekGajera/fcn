const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON,paginate } = require('./plugins');

//target

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false
  },
  from_user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  to_user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status : {
    type : Number,
    enum : [0,1,2], // 0 is pending, 1 is approved, 2 is declined
    default : 0
  },
 
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);
transactionSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Target
 */
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

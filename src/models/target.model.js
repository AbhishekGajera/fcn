const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON,paginate } = require('./plugins');

//target

const targetSchema = new mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
    autopopulate: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  userType: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  status : {
    type: Number,
    required: true,
    default : 1,
    enum: [1,2,3,4] // 1 : is for running , 2: is for finished , 3: is for canceled , 4: is for archieved
  }
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
targetSchema.plugin(toJSON);
targetSchema.plugin(paginate);
targetSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Target
 */
const Target = mongoose.model('Target', targetSchema);

module.exports = Target;

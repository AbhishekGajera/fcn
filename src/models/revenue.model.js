const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON,paginate } = require('./plugins');

//target

const revenueSchema = new mongoose.Schema({


    product: {
      type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
    autopopulate: true,
      },
      branch : {
        type : String,
        required : false,
      },
      IBO : {
        type : String,
        required : false,
      },
      
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
      },
      total_revenue: {
        type: Number,
        required: true,
      },
      net_revenue: {
        type: Number,
        required: true,
      },
      commision_branch: {
        type: Number,
        required: true,
      },
      commision_ibo: {
        type: Number,
        required: true,
      },
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
revenueSchema.plugin(toJSON);
revenueSchema.plugin(paginate);
revenueSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Target
 */
const Revenue = mongoose.model('Revenue', revenueSchema);

module.exports = Revenue;

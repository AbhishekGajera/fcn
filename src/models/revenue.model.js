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
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
      },
      from_user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
      },
      description: {
        type: String,
        required: true,
      },
      total_revenue: {
        type: Number,
        required: true,
      },
      net_revenue: {
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

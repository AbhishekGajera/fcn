const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const validator = require('validator');


//salary

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        required: true,
      },
      branch : {
        type : String,
        required : false,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
    contactno: {
        type : Number,
        required : true
      },
   
    status : {
        type : Number,
        enum : [0,1], // 0 is New, 1 is Working
        default : 0
      },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
leadSchema.plugin(require('mongoose-autopopulate'));
leadSchema.plugin(toJSON);
leadSchema.plugin(paginate);

/**
 * @typedef Leave
 */
const Lead = mongoose.model('lead', leadSchema);

module.exports = Lead;

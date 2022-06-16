const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON,paginate } = require('./plugins');

//target

const contactSchema = new mongoose.Schema({


  name: {
    type: String,
    required: true,
  },
  contactno: {
    type : Number,
    required : true
  },
  branch : {
    type : String,
    required : false,
  },
  type : {
    type: Number,
    required: true,
    enum: [1,2] // 1 :- free 2 :- paid
  },
  date: {
    type: Date,
  },
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);
contactSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Target
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

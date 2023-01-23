const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//powerOne

const powerOneSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true
  },
  mobile : {
    type : Number,
    required : true
  },
  address : {
    type : String,
    required : false
  },
  city : {
    type : String,
    required : false
  },
  state : {
    type : String,
    required : false
  },
  country : {
    type : String,
    required : false
  },
  pancard : {
    type : Boolean,
    required : false
  },
  aadharcard : {
    type : Boolean,
    required : false
  },
  bankpassbook : {
    type : Boolean,
    required : false
  },
  aadhar_card_img : {
    type : String,
    required : false
  },
  pan_card_img : {
    type : String,
    required : false
  },
  passbook_card_img : {
    type : String,
    required : false
  },
  passport_number : {
    type : String,
    required : false
  },
  pan_number : {
    type : String,
    required : false
  },
  aadhar_number : {
    type : String,
    required : false
  },
  method_by : {
    type : String,
    required : false
  },
  payment_no : {
    type : String,
    required : false
  },
  cheque : {
    type : String,
    required : false
  },
  payment_gateway : {
    type : String,
    required : false
  },
  rtgs : {
    type : String,
    required : false
  },
  neft : {
    type : String,
    required : false
  },
  payment_screenshot : {
    type : String,
    required : false
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
powerOneSchema.plugin(toJSON);
powerOneSchema.plugin(paginate);
powerOneSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Powerone
 */
const Powerone = mongoose.model('Powerone', powerOneSchema);

module.exports = Powerone;

const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//powerOne

const powerOneSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
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
    required : true
  },
  city : {
    type : String,
    required : true
  },
  state : {
    type : String,
    required : true
  },
  country : {
    type : String,
    required : true
  },
  pancard : {
    type : Boolean,
    required : true
  },
  aadharcard : {
    type : Boolean,
    required : true
  },
  bankpassbook : {
    type : Boolean,
    required : true
  },
  aadhar_card_img : {
    type : String,
    required : true
  },
  pan_card_img : {
    type : String,
    required : true
  },
  passbook_card_img : {
    type : String,
    required : true
  },
  voter_card_img : {
    type : String,
    required : true
  },
  cheque : {
    type : String,
    required : true
  },
  rtgs : {
    type : String,
    required : true
  },
  neft : {
    type : String,
    required : true
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

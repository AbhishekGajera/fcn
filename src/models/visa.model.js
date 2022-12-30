const mongoose = require('mongoose');
const { toJSON , paginate} = require('./plugins');

// visa

const visaSchema = new mongoose.Schema({
  name : { type: String, required: true },
  surname : { type: String, required: true },
  gender : { type : String, required : false },
  dob : { type : Date, required : false },
  isOutIndiaBirth : { type : String, required : true , default : 'yes' },
  city : { type : String, required : true , default : 'yes' },
  pan : { type : String, required : true , default : 'yes' },
  voter : { type : String, required : true , default : 'yes' },
}
,
  {
    timestamps: true,
  });

// add plugin that converts mongoose to json
visaSchema.plugin(toJSON);
visaSchema.plugin(require('mongoose-autopopulate'));
visaSchema.plugin(paginate);

/**
 * @typedef Visa
 */
const Visa = mongoose.model("Visa", visaSchema);

module.exports = Visa;

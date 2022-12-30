const mongoose = require('mongoose');
const { toJSON , paginate} = require('./plugins');

// passport

const passportSchema = new mongoose.Schema({
  name : { type: String, required: true },
  surname : { type: String, required: true },
  gender : { type : String, required : false },
  dob : { type : Date, required : false },
  isOutIndiaBirth : { type : String, required : true , default : 'yes' },
  city : { type : String, required : true , default : 'yes' },
  pan : { type : String, required : true , default : 'yes' },
  voter : { type : String, required : true , default : 'yes' }
}
,
  {
    timestamps: true,
  });

// add plugin that converts mongoose to json
passportSchema.plugin(toJSON);
passportSchema.plugin(require('mongoose-autopopulate'));
passportSchema.plugin(paginate);

/**
 * @typedef Passport
 */
const Passport = mongoose.model("Passport", passportSchema);

module.exports = Passport;

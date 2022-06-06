const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//appoinments

const appoinmentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  fromDate: {
    type: Date,
    required : true
  },
  toDate:{
    type: Date,
    required : true
  },
  Description: {
    type: String,
  },
  status : {
    type: Number,
    required: true,
    default : 1,
    enum: [1,2,3,4,5] // 1 : is for processing , 2: is for approved , 3: is for rejected , 4: is for successfull, 5: is for terminated
  }
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
appoinmentsSchema.plugin(toJSON);
appoinmentsSchema.plugin(paginate);
appoinmentsSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Appoinments
 */
const Appoinments = mongoose.model('Appoinments', appoinmentsSchema);

module.exports = Appoinments;

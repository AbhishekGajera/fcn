const mongoose = require('mongoose');
const { toJSON , paginate} = require('./plugins');

// cost

const costSchema = new mongoose.Schema({
  totalCost: { type: Number, required: true },
  category : { type: String, required: false },
  description : { type : String, required : false },
  image : { type : String, required : false },
  type : { type : String, required : false, enum : ['Office expence','Employee expence','Misleniuneous expence','Other expence',''] },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
    autopopulate : true
  } 
}
,
  {
    timestamps: true,
  });

// add plugin that converts mongoose to json
costSchema.plugin(toJSON);
costSchema.plugin(require('mongoose-autopopulate'));
costSchema.plugin(paginate);

/**
 * @typedef Cost
 */
const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;

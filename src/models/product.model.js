const mongoose = require('mongoose');
const { toJSON , paginate} = require('./plugins');

// product

const productSchema = new mongoose.Schema({
  name : { type: String, required: true },
  category : { type: String, required: true },
  description : { type : String, required : false },
  image : { type : String, required : false },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate : true
  } 
}
,
  {
    timestamps: true,
  });

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(require('mongoose-autopopulate'));
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

const httpStatus = require('http-status');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a product
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const approveProduct = async (leaveBody) => {
  return Product.create(leaveBody);
};


/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getProductById = async (id) => {
  return Product.findById(id);
};


/**
 * Update product by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateProductById = async (leaveId, updateBody) => {
  const product = await getProductById(leaveId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};



/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Employee>}
 */
 const deleteProductById = async (productId) => {
  const productdata = await getProductById(productId);
  if (!productdata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  await productdata.remove();
  return productdata;
};


/**
 * Get products
 * @returns {Promise<Employee>}
 */
 const getProductsList = async (filter,options) => {
 const product = await Product.paginate(filter, options);
 if (!product) {
   throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
 }
 return product;
};



module.exports = {
  approveProduct,
  updateProductById,
  deleteProductById,
  getProductsList
};

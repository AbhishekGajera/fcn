const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveProduct, getProductsList, deleteProductById,updateProductById } = require('../services/product.service');
const pick = require('../utils/pick');
const formidable = require('formidable');
const path = require('path')
const fs = require('fs');
const uploadToCloudinary = require('../utils/uploadToCloudnary');

const productApprove = catchAsync(async (req, res) => {
  const form = formidable.IncomingForm();
  const uploadFolder = path.join(__dirname, '../../files');

  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.uploadDir = uploadFolder;
  console.info(req?.file)
  console.info(req?.files)

  // Check if multiple files or a single file
  if (!req?.files?.length) {
    //Single file

    const file = req?.files?.image;

    // creates a valid name by removing spaces
    const fileName = encodeURIComponent(file?.name?.replace(/\s/g, '-'));

    try {
      // renames the file in the directory
      fs.renameSync((file?.path || ''), (uploadFolder + '/' + fileName));
      const result = await uploadToCloudinary(uploadFolder + '/' + fileName,'products')
      req.fields.image = result.url
    } catch (error) {
      console.error(error)
    }
  }

  const result = await approveProduct(req.fields);
  res.status(httpStatus.CREATED).send(result);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getProductsList(filter, options);
  res.send(result);
});

const deleteProduct = catchAsync(async (req, res) => {
  try {
    await deleteProductById(req.params.productId);
    return res.status(httpStatus.CREATED).send({ success : true });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({ success : false });
  }
});

const productsUpdate = catchAsync(async (req, res) => {
  const result = await updateProductById(req.body.productId,req.body);
  res.send(result);
});

module.exports = {
  productApprove,
  getProducts,
  deleteProduct,
  productsUpdate
};

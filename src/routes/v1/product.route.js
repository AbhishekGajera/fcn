const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const formidable = require('express-formidable');


const router = express.Router();
router.use(formidable())

router
  .route('/')
  .post(auth(), productController.productApprove)
  .get(auth(), productController.getProducts);

  router
  .route('/:productId')
  .get(auth(),validate(productValidation.deleteProduct), productController.deleteProduct)

module.exports = router;

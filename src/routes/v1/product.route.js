const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const formidable = require('express-formidable');
var multer = require('multer');


const router = express.Router();
router.use(formidable());

const upload = multer({ dest: 'images/' });



router
  .route('/')
  .post(auth(),upload.single('image'), productController.productApprove)
  .get( productController.getProducts);

  router
.route('/update-product')
.patch( productController.productsUpdate)



  router
  .route('/:productId')
  .get(auth(),validate(productValidation.deleteProduct), productController.deleteProduct)

module.exports = router;

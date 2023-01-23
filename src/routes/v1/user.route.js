const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(validate(userValidation.getUsers), userController.getUsers);

  router
  .route('/users-count-powerone')
  .get(auth(), validate(userValidation.getUsers), userController.getUsersPowerone);

  router
  .route('/users-count-sip')
  .get(auth(), validate(userValidation.getUsers), userController.getUsersSIP);

router
  .route('/get-user-branch')
  .get(auth(), validate(userValidation.getUsers), userController.getUsersByBranch);
  router
  .route('/get-user-ibo/:id')
  .get(auth(), validate(userValidation.getUsers), userController.getUsersByIbo);
  router
  .route('/get-product-client/:clientId')
  .get(auth(), validate(userValidation.getUsers), userController.getProductClient); 
  router
  .route('/get-invest-user/:usrId')
  .get(auth(), validate(userValidation.getUsers), userController.getTotalInvest);   

router
  .route('/product-assign')
  .patch(auth(), userController.productAssign)

  router
  .route('/get-top-perfomance/:userId/:userType/:perfomanceType')
  .get( userController.getTopPerfomer)

router
  .route('/:userId')
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
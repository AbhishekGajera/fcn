const express = require('express');
const validate = require('../../middlewares/validate');
const leadValidation = require('../../validations/lead.validation');
const leadController = require('../../controllers/lead.controller');

const router = express.Router();

router
  .route('/add-lead')
.post(validate(leadValidation.addLead), leadController.leadAdd);




router.post('/update-lead', validate(leadValidation.updateLeave), leadController.leadUpdate);
router.delete('/delete-lead/:leadId', validate(leadValidation.deleteLeave), leadController.leadDelete);
router.get('/get-lead', leadController.getLeads);

module.exports = router;

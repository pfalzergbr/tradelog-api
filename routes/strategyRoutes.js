const express = require('express');
const { body } = require('express-validator');
const { checkValidation } = require('../middleware/check-Validation');
const auth = require('../middleware/auth');
const strategyControllers = require('../controllers/strategyControllers')
const router = express.Router();


// Create new Strategy - TODO: add validation
router.post('/', auth, strategyControllers.createStrategy)
// Get one strategy
router.get('/:strategyId', auth, strategyControllers.getStrategy)
// Update a strategy - TODO: add validation
router.patch('/:strategyId', auth, strategyControllers.updateStrategy)
// Delete a strategy
router.delete('/:strategyId', auth, strategyControllers.deleteStrategy)
// Get all strategies by user ID
router.get('/list', auth, strategyControllers.getUserStrategies)
// Get all strategies by account ID
router.get('/list/:accountId', auth, strategyControllers.getAccountStrategies)



module.exports = router;

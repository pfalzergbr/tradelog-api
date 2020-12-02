const express = require('express');
const { body } = require('express-validator');
const { checkValidation } = require('../middleware/check-Validation');
const auth = require('../middleware/auth');
const strategyController = require('../controllers/strategyControllers')

const router = express.Router();


// Create new Strategy
router.post('/', auth)
// Get one strategy
router.get('/:strategyId', auth)
// Update a strategy
router.patch('/:strategyId', auth,)
// Delete a strategy
router.delete('/:strategyId', auth)
// Get all strategies by user ID
router.get('/list', auth)
// Get all strategies by account ID
router.get('/list/:accountId', auth)



module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const { checkValidation } = require('../middleware/check-validation');
const auth = require('../middleware/auth');
const strategyControllers = require('../controllers/strategyControllers');
const router = express.Router();

router.get('/user/', auth, strategyControllers.getUserStrategies);
// Get all strategies by account ID
router.get(
  '/account/:accountId',
  auth,
  strategyControllers.getAccountStrategies,
);
// Create new Strategy - TODO: add validation
router.post(
  '/',
  auth,
  [
    body('strategyName').not().isEmpty().trim(),
    body('accountId').not().isEmpty().isString(),
    body('description').not().isEmpty().isString(),
  ],
  checkValidation,
  strategyControllers.createStrategy,
);
// Get one strategy
router.get('/stats/:accountId', auth, strategyControllers.getStrategyStats);
router.get('/:strategyId', auth, strategyControllers.getStrategy);
// Update a strategy - TODO: add validation
router.patch(
  '/:strategyId',
  [
    body('strategyName').not().isEmpty().trim(),
    body('description').not().isEmpty().isString(),
  ],
  checkValidation,
  auth,
  strategyControllers.updateStrategy,
);
// Delete a strategy
router.delete('/:strategyId', auth, strategyControllers.deleteStrategy);
// Get all strategies by user ID

module.exports = router;

const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', problemController.getProblems);
router.get('/:id', problemController.getProblem);

// Admin only routes
router.post('/', protect, adminOnly, problemController.createProblem);
router.put('/:id', protect, adminOnly, problemController.updateProblem);
router.delete('/:id', protect, adminOnly, problemController.deleteProblem);

module.exports = router;

const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, submissionController.submitProblem);
router.get('/my', protect, submissionController.getUserSubmissions);
router.get('/', protect, adminOnly, submissionController.getAllSubmissions); // Admin views all submissions

module.exports = router;

const submissionService = require('../services/submissionService');

exports.submitProblem = async (req, res) => {
  try {
    const { problemId, code } = req.body;
    const userId = req.user._id;
    const submission = await submissionService.submitCode(userId, problemId, code);
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await submissionService.getAllSubmissions();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await submissionService.getUserSubmissions(req.user._id);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

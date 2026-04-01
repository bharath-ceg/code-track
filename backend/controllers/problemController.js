const problemService = require('../services/problemService');

exports.getProblems = async (req, res) => {
  try {
    const problems = await problemService.getAllProblems();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProblem = async (req, res) => {
  try {
    const problem = await problemService.getProblemById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProblem = async (req, res) => {
  try {
    const problem = await problemService.createProblem(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const problem = await problemService.updateProblem(req.params.id, req.body);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const problem = await problemService.deleteProblem(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json({ message: 'Problem removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

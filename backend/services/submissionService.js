const Submission = require('../models/Submission');

exports.submitCode = async (userId, problemId, code) => {
  // Simplistic local judgement logic: default to 'Accepted' for demo purposes
  // A real implementation would push to Judge0 or similar engine.
  const status = 'Accepted'; 
  return await Submission.create({ userId, problemId, code, status });
};

exports.getAllSubmissions = async () => {
  return await Submission.find({}).populate('userId', 'name registerNumber').populate('problemId', 'title difficulty');
};

exports.getUserSubmissions = async (userId) => {
  return await Submission.find({ userId }).populate('problemId', 'title difficulty');
};

const Problem = require('../models/Problem');

exports.getAllProblems = async () => {
  return await Problem.find({});
};

exports.getProblemById = async (id) => {
  return await Problem.findById(id);
};

exports.createProblem = async (problemData) => {
  return await Problem.create(problemData);
};

exports.updateProblem = async (id, updateData) => {
  return await Problem.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteProblem = async (id) => {
  return await Problem.findByIdAndDelete(id);
};

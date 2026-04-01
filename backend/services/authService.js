const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (userData) => {
  const { name, registerNumber, department, email, password, role } = userData;
  const userExists = await User.findOne({ $or: [{ email }, { registerNumber }] });
  if (userExists) {
    throw new Error('User already exists');
  }
  const user = await User.create({ name, registerNumber, department, email, password, role });
  return user;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d',
    });
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authData = await authService.loginUser(email, password);
    // Setting session logic for EJS part
    if (req.session) {
      req.session.user = authData;
    }
    res.status(200).json(authData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.status(200).json({ message: 'Logged out successfully' });
};

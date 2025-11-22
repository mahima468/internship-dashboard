const userService = require('../services/userService');

const getProfile = async (req, res, next) => {
  try {
    const profile = await userService.getUserProfile(req.user.id);
    res.status(200).json({ success: true, profile });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await userService.updateUserProfile(req.user.id, req.body);
    res.status(200).json({ success: true, profile });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };

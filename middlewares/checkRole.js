const { respondError } = require('../helpers/response');
// models
const UserRole = require('../models/User_Roles');

module.exports = {
  admin: async(req, res, next) => {
    const { user } = req;

    const checkRole = await UserRole.findOne({ user: user._id })
    if (checkRole.role !== 'admin') {
      return next(respondError(403, 'forbidden'));
    }

    return next();
  },
};

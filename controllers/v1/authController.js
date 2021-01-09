// core modules
const jwt = require('jsonwebtoken');
// models
const User = require('../../models/Users');
const UserRole = require('../../models/User_Roles');

// helpers
const { respondSuccess, respondFailure, respondError } = require('../../helpers/response');
const {
  getMessageFromValidationError,
} = require('../../helpers/utils');
const {
  validateSignUp,
  validateSignIn,
} = require('../../helpers/inputValidation');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({
    sub: user.id,
    iat: timestamp,
    expiresIn: '4h',
  }, process.env.JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { body } = req;
    const { email } = body;

    const { error } = validateSignUp(body); // Validating the req body
    if (error) {
      return next(respondError(422, getMessageFromValidationError(error)));
    }

    const checkEmailExists = await User.findOne({ email: email.toLowerCase() });
    if (checkEmailExists) {
      return respondFailure(res, "Email Already Exists");
    }

    const newUser = new User(body);
    await newUser.save();

    const checkForAdmin = await UserRole.findOne({ role: 'admin' })
    if (checkForAdmin) {
      const newRole = new UserRole({ user: newUser.id, role: 'user' });
      await newRole.save();
    } else {
      const newRole = new UserRole({ user: newUser.id, role: 'admin' });
      await newRole.save();
    }

    return respondSuccess(res, "User Registered Successfully");
  },

  signIn: async (req, res, next) => {
    const { body } = req;
    const { email } = body;

    const { error } = validateSignIn(body);
    if (error) {
      return next(respondError(422, getMessageFromValidationError(error)));
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('firstName lastName email');

    const tokenId = tokenForUser(user);
    const getRole = await UserRole.findOne({ user: user.id })

    const updateUserObj = user.toObject()
    updateUserObj.role = getRole.role;

    return res
      .status(200)
      .json({
        success: true,
        message: "Login Successfully",
        data: updateUserObj,
        token: tokenId,
      });
  },
};

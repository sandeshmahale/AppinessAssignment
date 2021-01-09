const { respondError } = require('../helpers/response');

module.exports = {
  requireApiKey: (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey) {
      return next(respondError(400, 'x-api-key is required in header'));
    }

    if (!(apiKey === process.env.API_KEY)) {
      return next(respondError(400, 'invalid api-key'));
    }

    return next();
  },
};

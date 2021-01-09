module.exports = {
  respondSuccess: (res, message, data) => {
    if (!data) {
      return res.status(200).json({
        success: true,
        message: !message ? 'query was successfull' : message,
      });
    }
    return res.status(200).json({
      success: true,
      message: !message ? 'query was successfull' : message,
      data,
    });
  },

  respondFailure: (res, message) => {
    res.status(202).json({
      success: false,
      message: !message ? 'something went wrong' : message,
    });
  },

  respondError: (status, message) => {
    const error = new Error(`message ${message}`);
    error.status = status;
    return error;
  },


  urlNotFound: (res, data) => {
    const error = new Error('url not found, please check the documentation');
    error.status = 404;

    return error;
  },
};

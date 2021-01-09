module.exports = {

  getMessageFromValidationError: (error) => {
    const message = error.details[0].message.replace(/\"/g, '');
    const path = error.details[0].path.join().replace(/0,/g, '').replace(/,/g, '.');
    return message + ', PATH: ' + path;
  },

};

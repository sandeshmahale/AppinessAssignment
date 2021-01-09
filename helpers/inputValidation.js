const Joi = require('joi');

module.exports = {
  // auth
  validateSignUp: (input) => {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(6).max(16).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    });
    return Joi.validate(input, schema);
  },

  validateSignIn: (input) => {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(6).max(16).required(),
    });
    return Joi.validate(input, schema);
  },

  validateCategoryDetails: (input) => {
    const schema = Joi.object().keys({
      categoryName: Joi.string().required(),
      categoryDescription: Joi.string().required(),
    });
    return Joi.validate(input, schema);
  },

  validateProductDetails: (input) => {
    const schema = Joi.object().keys({
      productName: Joi.string().required(),
      productDescription: Joi.string().required(),
      categoryId: Joi.string().required(),
    });
    return Joi.validate(input, schema);
  }
}
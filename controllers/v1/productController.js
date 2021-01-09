// models
const Product = require('../../models/Products');
const Category = require('../../models/Categories');
const User = require('../../models/Users');

const {
  getMessageFromValidationError,
} = require('../../helpers/utils');

const { respondSuccess, respondFailure, respondError } = require('../../helpers/response');

const { validateProductDetails,
} = require('../../helpers/inputValidation');

module.exports = {

  addProduct: async (req, res, next) => {
    const { body } = req;

    const { error } = validateProductDetails(body);
    if (error) {
      return next(respondError(422, getMessageFromValidationError(error)));
    }

    const findProduct = await Product.findOne({ productName: body.productName });
    if (findProduct) {
      return respondFailure(res, "Product Already Exists");
    }

    const checkCategory = await Category.findById(body.categoryId);
    if (!checkCategory) {
      return respondFailure(res, "Category Not Found");
    }

    const newProduct = new Product(body);
    await newProduct.save();

    return respondSuccess(res, "Product Created");
  },

  allProduct: async (req, res, next) => {
    const products = await Product.find({}).select('productName productDescription').populate('categoryId', 'categoryName categoryDescription');
    return respondSuccess(res, null, products);
  },
};

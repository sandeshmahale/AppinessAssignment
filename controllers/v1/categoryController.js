const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// models
const Category = require('../../models/Categories');
const Product = require('../../models/Products');

const {
    getMessageFromValidationError,
} = require('../../helpers/utils');

const { respondSuccess, respondFailure, respondError } = require('../../helpers/response');

const { validateCategoryDetails } = require('../../helpers/inputValidation');

module.exports = {

    addCategory: async (req, res, next) => {
        const { body } = req;

        const { error } = validateCategoryDetails(body);
        if (error) {
            return next(respondError(422, getMessageFromValidationError(error)));
        }

        const findCategory = await Category.findOne({ categoryName: body.categoryName });
        if (findCategory) {
            return respondFailure(res, "Category Already Exists");
        }

        const newCategory = new Category(body);
        await newCategory.save();

        return respondSuccess(res, "Category Created");
    },

    allCategory: async (req, res, next) => {

        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'product'
                }
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    categoryDescription: 1,
                    product: { $size: '$product' }

                }
            }
        ])
        return respondSuccess(res, null, categories);
    },

    deleteCategory: async (req, res, next) => {

        const categoryId = req.params.id;

        const checkCategory = await Category.findById(categoryId);
        if (!checkCategory) {
            return respondFailure(res, "Category Not Found");
        }

        const category = await Category.aggregate([
            {
                $match: {
                    _id: ObjectId(categoryId)
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'product'
                }
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    categoryDescription: 1,
                    product: 1

                }
            }
        ])

        await Category.deleteOne({ _id: categoryId });
        await Product.deleteMany({ categoryId: categoryId });

        return respondSuccess(res, null, category);
    },
};

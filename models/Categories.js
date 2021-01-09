const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    categoryName: { type: String, default: '' },
    categoryDescription: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model('Categories', CategorySchema);

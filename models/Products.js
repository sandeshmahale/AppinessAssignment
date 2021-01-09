const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    productName: { type: String, default: '' },
    productDescription: { type: String, default: '' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Categories' },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model('Products', ProductSchema);

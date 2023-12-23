import mongoose from 'mongoose';
const { Schema, models } = mongoose;

const productSchema = new Schema(
  {
    access: {
      type: Array,
      required: true,
      default: [],
    },
    products: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

const Product =
  models.Product || mongoose.model('Product', productSchema, 'products');
export default Product;

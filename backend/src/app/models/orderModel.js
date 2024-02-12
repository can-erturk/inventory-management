import mongoose from 'mongoose';
const { Schema, models } = mongoose;

const orderSchema = new Schema(
  {
    access: {
      type: Array,
      required: true,
      default: [],
    },
    orders: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

const Order = models.Order || mongoose.model('Order', orderSchema, 'orders');
export default Order;

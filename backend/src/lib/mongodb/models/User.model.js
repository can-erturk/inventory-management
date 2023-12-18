import mongoose from 'mongoose';
const { Schema, models } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    activation: {
      type: Object,
      required: true,
      default: {
        status: false,
        code: null,
      },
    },
  },
  { timestamps: true },
);

const User = models.User || mongoose.model('User', userSchema, 'users');
export default User;

import mongoose from 'mongoose';
import getEnv from '#src/lib/helpers/getEnv.js';

const MONGODB_URI = getEnv('MONGODB_URI');

export default async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
}

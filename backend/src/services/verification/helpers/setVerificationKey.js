import connectDB from '../../../lib/mongodb/connectDB.js';
import User from '../../../lib/mongodb/models/User.model.js';
import { sha256 } from '../../../lib/helpers/crypter.js';

export default async function setVerificationKey(email) {
  try {
    await connectDB();
    const key = sha256(email);

    await User.updateOne({ email }, { 'activation.code': key });

    return {
      status: true,
      message: 'Verification key is set.',
    };
  } catch (error) {
    return {
      status: false,
      message: 'Something went wrong while setting verification key.',
    };
  }
}

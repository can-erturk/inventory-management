import connectDB from '#src/lib/mongodb/connectDB.js';
import User from '#src/lib/mongodb/models/User.model.js';
import { sha256 } from '#src/lib/helpers/crypter.js';

export default async function setVerificationKey(email) {
  try {
    await connectDB();

    // Generate verification key
    const key = sha256(email + new Date());

    // Set key expiration date to 1 hour
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Set verification key
    await User.updateOne(
      { email },
      { 'activation.key': key, 'activation.keyExpiresAt': expiresAt },
    );

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

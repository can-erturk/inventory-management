import checkVerification from './helpers/checkVerification.js';

export default async function isVerified(req, res) {
  const { email } = req.query;

  // Check if email is provided
  if (!email) {
    return res.send({
      status: 400,
      message: 'Email is required.',
    });
  }

  // Check if email is verified
  const isVerified = await checkVerification(email);

  if (isVerified.status === true) {
    return res.send({
      status: 200,
      message: 'Email is verified.',
    });
  } else {
    return res.send({
      status: 400,
      message: 'Email is not verified.',
    });
  }
}

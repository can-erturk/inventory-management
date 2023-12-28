import emailSender from '#src/lib/helpers/emailSender.js';
import VerificationMail from '#src/lib/templates/verificationMail.js';
import verificationURL from './helpers/verificationURL.js';
import checkVerification from './helpers/checkVerification.js';
import setVerificationKey from './helpers/setVerificationKey.js';

export default async function sendEmail(req, res) {
  const { email } = req.query;

  // Check if email is already verified
  const isVerified = await checkVerification(email);

  if (isVerified.status === true) {
    return res.send({
      status: 400,
      message: 'Email is already verified.',
    });
  }

  // Set verification key if not already set or expired
  if (isVerified.key === null || isVerified.keyExpiresAt < new Date()) {
    const setKey = await setVerificationKey(email);

    if (setKey.status !== true) {
      return res.send({
        status: 500,
        message: 'Failed to setting verification key.',
      });
    }
  }

  // Generate verification URL
  const verifyLink = await verificationURL(email);

  if (verifyLink.status !== 200) {
    return res.send({
      status: 500,
      message: 'Something went wrong while generating verification URL.',
    });
  }

  // Send verification email
  const html = VerificationMail(verifyLink.url);
  const sent = await emailSender(email, 'Email Verification', html);

  // Check if email is sent successfully
  if (sent instanceof Error) {
    return res.send({
      status: 500,
      message: 'Something went wrong while sending email.',
    });
  } else {
    return res.send({
      status: 200,
      message: 'Verification email sent.',
    });
  }
}

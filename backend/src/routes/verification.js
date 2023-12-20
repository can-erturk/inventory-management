import express from 'express';
import sendEmail from '#src/services/verification/sendEmail.js';
import verifyEmail from '#src/services/verification/verifyEmail.js';
import isVerified from '#src/services/verification/isVerified.js';

const router = express.Router();

router.get('/send-email', async (req, res) => {
  return await sendEmail(req, res);
});

router.get('/verify-email', async (req, res) => {
  return await verifyEmail(req, res);
});

router.get('/is-verified', async (req, res) => {
  return await isVerified(req, res);
});

export default router;

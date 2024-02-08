import express from 'express';
import sendEmail from '#controllers/verification/sendEmail.js';
import verifyEmail from '#controllers/verification/verifyEmail.js';
import isVerified from '#controllers/verification/isVerified.js';
import checkEmail from '#middlewares/checkEmail.js';

const router = express.Router();

router.get('/send-email', checkEmail, async (req, res) => {
  return await sendEmail(req, res);
});

router.get('/verify-email', async (req, res) => {
  return await verifyEmail(req, res);
});

router.get('/is-verified', checkEmail, async (req, res) => {
  return await isVerified(req, res);
});

export default router;

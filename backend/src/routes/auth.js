import express from 'express';
import login from '#src/services/auth/login.js';
import register from '#src/services/auth/register.js';
import getCredentials from '#src/services/auth/getCredentials.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  return await login(req, res);
});

router.post('/register', async (req, res) => {
  return await register(req, res);
});

router.post('/get-credentials', async (req, res) => {
  return await getCredentials(req, res);
});

export default router;

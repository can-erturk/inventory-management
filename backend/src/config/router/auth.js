import express from 'express';
import login from '#controllers/auth/login.js';
import register from '#controllers/auth/register.js';
import getCredentials from '#controllers/auth/getCredentials.js';
import checkEmail from '#middlewares/checkEmail.js';
import isUserExist from '#controllers/auth/isUserExist.js';

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

router.get('/is-exist', checkEmail, async (req, res) => {
  return await isUserExist(req, res);
});

export default router;

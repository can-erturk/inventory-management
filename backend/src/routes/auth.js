import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Auth route' });
});

export default router;

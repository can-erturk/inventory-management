import express from 'express';
import authRoute from './auth.js';
import verificationRoute from './verification.js';
import productsRoute from './products.js';

const app = express();

app.use('/auth', authRoute);
app.use('/verification', verificationRoute);
app.use('/products', productsRoute);

export default app;

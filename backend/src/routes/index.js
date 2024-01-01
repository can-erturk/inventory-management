import express from 'express';
import authRoute from '#src/routes/auth.js';
import verificationRoute from '#src/routes/verification.js';
import productsRoute from '#src/routes/products.js';

const app = express();

app.use('/auth', authRoute);
app.use('/verification', verificationRoute);
app.use('/products', productsRoute);

export default app;

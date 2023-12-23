import express from 'express';
import checkJwt from '#src/middlewares/checkJwt.js';
import checkProductID from '#src/middlewares/checkProductID.js';
import getProducts from '#src/services/products/getProducts.js';
import createProduct from '#src/services/products/createProduct.js';
import updateProduct from '#src/services/products/updateProduct.js';
import deleteProduct from '#src/services/products/deleteProduct.js';

const app = express();

app.use(checkJwt);

app.post('/get', (req, res) => {
  return getProducts(req, res);
});

app.post('/create', (req, res) => {
  return createProduct(req, res);
});

app.post('/update', checkProductID, (req, res) => {
  return updateProduct(req, res);
});

app.post('/delete', checkProductID, (req, res) => {
  return deleteProduct(req, res);
});

export default app;

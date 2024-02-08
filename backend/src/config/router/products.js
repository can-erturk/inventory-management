import express from 'express';
import checkJwt from '#middlewares/checkJwt.js';
import checkProductID from '#middlewares/checkProductID.js';
import getProducts from '#controllers/products/getProducts.js';
import createProduct from '#controllers/products/createProduct.js';
import updateProduct from '#controllers/products/updateProduct.js';
import deleteProduct from '#controllers/products/deleteProduct.js';

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

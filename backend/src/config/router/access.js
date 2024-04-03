import express from 'express';
import checkJwt from '#middlewares/checkJwt.js';
import receiveAccess from '#controllers/access/receiveAccess.js';
import viewShared from '#controllers/access/viewShared.js';
import viewReceived from '#controllers/access/viewReceived.js';
import generateURL from '#controllers/access/generateURL.js';
import revokeShared from '#controllers/access/revokeShared.js';
import revokeReceived from '#controllers/access/revokeReceived.js';

const app = express();

app.use(checkJwt);

app.post('/generate-url', (req, res) => {
  return generateURL(req, res);
});

app.post('/receive', (req, res) => {
  return receiveAccess(req, res);
});

app.post('/view-shared', (req, res) => {
  return viewShared(req, res);
});

app.post('/view-received', (req, res) => {
  return viewReceived(req, res);
});

app.post('/revoke-shared', (req, res) => {
  return revokeShared(req, res);
});

app.post('/revoke-received', (req, res) => {
  return revokeReceived(req, res);
});

export default app;

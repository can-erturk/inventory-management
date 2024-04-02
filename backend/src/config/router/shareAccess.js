import express from 'express';
import checkJwt from '#middlewares/checkJwt.js';
import shareAccess from '#controllers/shareAccess/shareAccess.js';
import viewShared from '#controllers/shareAccess/viewShared.js';
import viewGranted from '#controllers/shareAccess/viewGranted.js';
import generateURL from '#controllers/shareAccess/generateURL.js';
import revokeShared from '#controllers/shareAccess/revokeShared.js';
import revokeGranted from '#controllers/shareAccess/revokeGranted.js';

const app = express();

app.use(checkJwt);

app.post('/generate-url', (req, res) => {
  return generateURL(req, res);
});

app.post('/share', (req, res) => {
  return shareAccess(req, res);
});

app.post('/view-shared', (req, res) => {
  return viewShared(req, res);
});

app.post('/view-granted', (req, res) => {
  return viewGranted(req, res);
});

app.post('/revoke-shared', (req, res) => {
  return revokeShared(req, res);
});

app.post('/revoke-granted', (req, res) => {
  return revokeGranted(req, res);
});

export default app;

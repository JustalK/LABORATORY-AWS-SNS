import * as express from 'express';
const router = express.Router();
const AWS = require('aws-sdk');

const CONFIG = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const sns = new AWS.SNS(CONFIG);

router.get(
  '/health',
  (_req: express.Request, res: express.Response<{ status: string }>) => {
    res.send({ status: 'working' });
  }
);

module.exports = router;

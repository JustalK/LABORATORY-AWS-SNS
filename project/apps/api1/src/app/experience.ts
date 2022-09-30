import * as express from 'express';
const router = express.Router();
const AWS = require('aws-sdk');

const CONFIG = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const params = {
  TopicArn: 'arn:aws:sns:ap-southeast-1:847304322063:nudgyt-test',
};

const sns = new AWS.SNS(CONFIG);
var subslistPromise = new AWS.SNS(CONFIG)
  .listSubscriptionsByTopic(params)
  .promise();

router.post(
  '/',
  express.text(),
  (req: express.Request, res: express.Response<{ status: string }>) => {
    let payloadStr = req.body;
    const payload = JSON.parse(payloadStr);
    console.log(JSON.stringify(payload));
    if (req.header('x-amz-sns-message-type') === 'SubscriptionConfirmation') {
      const url = payload.SubscribeURL;
      console.log('URL:', url);
    } else if (req.header('x-amz-sns-message-type') === 'Notification') {
      console.log(payload);
      //process data here
    } else {
      throw new Error(`Invalid message type ${payload.Type}`);
    }
  }
);

router.get(
  '/health',
  (_req: express.Request, res: express.Response<{ status: string }>) => {
    res.send({ status: 'working' });
  }
);

router.get(
  '/',
  (req: express.Request, res: express.Response<{ status: string }>) => {
    console.log(req);
    res.send({ status: 'working' });
  }
);

module.exports = router;

import * as express from 'express';
const router = express.Router();
const AWS = require('aws-sdk');

const CONFIG = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const sns = new AWS.SNS(CONFIG);

router.post(
  '/',
  express.text(),
  (req: express.Request, res: express.Response<{ status: string }>) => {
    let payloadStr = req.body;
    const payload = JSON.parse(payloadStr);
    if (req.header('x-amz-sns-message-type') === 'SubscriptionConfirmation') {
      const url = payload.SubscribeURL;
      console.log('URL:', url);
    } else if (req.header('x-amz-sns-message-type') === 'Notification') {
      console.log(payload);
      // PROCESS HERE
    } else {
      throw new Error(`Invalid message type ${payload.Type}`);
    }
  }
);

router.post(
  '/publish',
  express.text(),
  (req: express.Request, res: express.Response) => {
    const publishTextPromise = sns
      .publish({
        Message: req.body,
        TopicArn: process.env.TOPIC_ARN,
      })
      .promise();

    publishTextPromise
      .then(function (data) {
        res.send({ messageID: data.MessageId });
      })
      .catch(function (err) {
        throw new Error(err);
      });
  }
);

router.get(
  '/health',
  (_req: express.Request, res: express.Response<{ status: string }>) => {
    res.send({ status: 'working' });
  }
);

module.exports = router;

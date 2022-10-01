# LABORATORY-AWS-SNS

#### Lambda

```js
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  var sns = new AWS.SNS({ region: "<region>" });
  return sns
    .publish({
      TopicArn: "arn:aws:sns:<region>:<iam>:nudgyt-test",
      Message: "Test Lambda",
    })
    .promise();
};
```

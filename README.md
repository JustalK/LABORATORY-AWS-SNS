# LABORATORY-AWS-SNS

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

- [Theory](#theory)
- [Development](#development)
- [Result](#result)
- [Running](#running)
- [System](#system)

## Development

#### Create a SNS

SNS creation

[./documentation/1.png](./documentation/1.png)

Result

[./documentation/2.png](./documentation/2.png)

#### Subscrible to a SNS

Send a confirmation

[./documentation/3.png](./documentation/3.png)

Receive the link

[./documentation/4.png](./documentation/4.png)

Confirm

[./documentation/5.png](./documentation/5.png)

Confirmed

[./documentation/6.png](./documentation/6.png)

#### Test by code

[./documentation/7.png](./documentation/7.png)

#### Lambda

Create a lmabda function

[./documentation/8.png](./documentation/8.png)

Add a role for accessing SNS SDK

[./documentation/9.png](./documentation/9.png)

Create the lambda

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

[./documentation/10.png](./documentation/10.png)

Sent response

[./documentation/11.png](./documentation/11.png)

## Running

I am using NX, so for starting the project use the following command:

```bash
$ nx serve api
```

For testing the app, use Postman.

## System

Ubuntu Version: Ubuntu 20.04.1 LTS
Node Version: v16.15.1

```bash
# Get the version of node
$ node -v

# Get the latest version of ubuntu
$ lsb_release -a
```

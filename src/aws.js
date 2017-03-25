import * as AWS from 'aws-sdk';

const AWS_REGION = localStorage.getItem('AWS_REGION') || 'ap-southeast-2';
const AWS_KEY_ID = localStorage.getItem('AWS_KEY_ID');
const AWS_SERET_ACCESS_KEY = localStorage.getItem('AWS_SERET_ACCESS_KEY');

if (!AWS_KEY_ID || !AWS_SERET_ACCESS_KEY) {
  throw new Error('AWS_KEY_ID and AWS_SERET_ACCESS_KEY are not set!');
}

const config = new AWS.Config({
  accessKeyId: AWS_KEY_ID,
  secretAccessKey: AWS_SERET_ACCESS_KEY,
  region: AWS_REGION
});

export const ec2 = new AWS.EC2(config);

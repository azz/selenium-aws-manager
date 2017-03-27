import { EC2, ElasticBeanstalk, S3 } from 'aws-sdk';

export const ec2 = state => new EC2(state.credentials);

export const s3 = state => new S3(state.credentials);

export const elasticBeanstalk = state =>
  new ElasticBeanstalk(state.credentials);

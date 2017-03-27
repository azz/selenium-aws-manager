import { EC2, ElasticBeanstalk, S3 } from 'aws-sdk';
import { bindMethods } from './util';

export const ec2 = state => bindMethods(new EC2(state.credentials));

export const s3 = state => bindMethods(new S3(state.credentials));

export const elasticBeanstalk = state =>
  bindMethods(new ElasticBeanstalk(state.credentials));

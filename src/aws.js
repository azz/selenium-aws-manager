import { EC2 } from 'aws-sdk';

export const ec2 = credentials => new EC2(credentials);

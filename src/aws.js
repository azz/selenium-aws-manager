import { EC2 } from 'aws-sdk';

export const ec2 = state => new EC2(state.credentials);

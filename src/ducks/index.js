import { combineReducers } from 'redux';
import instances from './instances';
import error from './error';
import subnets from './subnets';
import keyPairs from './key-pairs';
import credentials from './credentials';
import images from './images';
import selenium from './selenium';

export default combineReducers({
  credentials,
  error,
  images,
  instances,
  keyPairs,
  subnets,
  selenium,
  instanceTypes: _ => ['m4.large', 'm4.xlarge', 'c4.large', 'c4.xlarge']
});

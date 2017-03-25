import React, { PropTypes } from 'react';

const name = tags => {
  const tag = tags.find(tag => tag.Key === 'Name');
  return tag ? tag.Value : '<No Name>';
};

const uptime = launchTime => {
  return Math.round((Date.now() - launchTime.getTime()) / (1000 * 60 * 60));
};

const Container = (
  {
    State,
    PrivateIpAddress,
    InstanceType,
    Tags,
    LaunchTime
  }
) => (
  <div className="Container">
    <h2>{name(Tags)} ({State.Name})</h2>
    <div>
      <strong>IP Address</strong>: <code>{PrivateIpAddress}</code>
    </div>
    <div>
      <strong>Instance Type</strong>: {InstanceType}
    </div>
    <div>
      <strong>Up Time</strong>: {uptime(LaunchTime)} hours
    </div>
  </div>
);

Container.propTypes = {
  State: PropTypes.object.isRequired,
  PrivateIpAddress: PropTypes.string.isRequired,
  InstanceType: PropTypes.string.isRequired,
  Tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  LaunchTime: PropTypes.object.isRequired
};

export default Container;
